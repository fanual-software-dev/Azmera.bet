import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt'
import { SmsService } from 'src/sms/sms.service';
import { JwtService } from '@nestjs/jwt';
import { ref } from 'node:process';





type PartialUser = {
    phoneNumber?: string;
    newPassword?: string;
}
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        private readonly smsService: SmsService,
        private readonly JWTService: JwtService
    ) {}

    async generateTokens(payload: { userId: string; phoneNumber: string }) {
        const access_token = await this.JWTService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        });

        const refresh_token = await this.JWTService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        });

        return { access_token, refresh_token };
    }
    
    
    async create(data: Partial<User>) {
        try {
            if (!data || !data.phoneNumber || !data.password) {
                return new BadRequestException('Please provide a phone number.');
            }

            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber });

            if (userExists) {
                return new BadRequestException('User already exists with this phone number.');
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = new this.userModel({ ...data, password: hashedPassword });

            return user.save();
        } catch (error) {
            return new InternalServerErrorException(error.message);
        }
    }

    async login( data: Partial<User>) {

        try {

            if ( !data || !data.phoneNumber || !data.password){
                return new BadRequestException('please fill all the reuired fields.')
            }
            
            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber })
            if ( !userExists ) {
                return new BadRequestException('User not found with this phone number.')
            }

            if ( !userExists.isVerified ){
                return new BadRequestException("User is not verified. Please verify your account first.")
            }

            const isMatch = await bcrypt.compare(data.password, userExists.password)

            
            if ( !isMatch ){
                return new BadRequestException("Phone number or password is incorrect. Please try again")
            }


            const payload = { sub: userExists._id, phoneNumber: userExists.phoneNumber };

            const accessToken = this.JWTService.sign(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m'
            });

            const refreshToken = this.JWTService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d'
            });

            userExists.refreshToken = refreshToken;
            await userExists.save();

            return { accessToken , refreshToken }


        } catch (error) {
            return new InternalServerErrorException(error.message)
        }
        
    }


    async generateNewAccessToken( phoneNumber: string , refreshToken: string) {

        try {
           
            const payload = await this.JWTService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            // optionally check if user still exists
            const user = await this.userModel.findById(payload.userId);
            if (!user) throw new UnauthorizedException('User not found');

            // generate new access + refresh
            const newTokens =  await this.generateTokens({
                userId: user._id as string,
                phoneNumber: user.phoneNumber,
            });

            user.refreshToken = newTokens.refresh_token;
            await user.save();

            return newTokens;

        } catch (err) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }


    async logout( phoneNumber: string , refreshToken: string) {

        try {

            if ( !phoneNumber || !refreshToken ){
                return new BadRequestException("Phone number or refresh token not provided.")
            }

            const user = await this.userModel.findOne({ phoneNumber: phoneNumber })

            if ( !user ){
                return new BadRequestException("User not found with this phone number.")
            }
            
            if ( user.refreshToken !== refreshToken ){
                return new BadRequestException("Invalid refresh token.")
            }

            user.refreshToken = 'none'

            await user.save()

            return {message: 'user logged out successfuly'}

            
        } catch (error) {
            return new InternalServerErrorException('Internal server error')
        }
    }

    async verify( data: Partial<User>, verificationType: string = "verification") {

        try {

            if ( !data || !data.phoneNumber || !data.verificationCode ){
                return new BadRequestException(" Phone number or verification code  not provided. Please provide your phone number.")
            }

            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber })

            if ( !userExists ){

                return new BadRequestException("User not found with this phone number.")
            }

            if ( verificationType === 'verification' && userExists.isVerified ){
                return new BadRequestException("User is already verified.")
            }

            if ( verificationType ==='verification' && userExists.verificationCode !== data.verificationCode ){
                return new BadRequestException("Verification code is incorrect. Please try again.")
            }

            if ( verificationType === 'verification' && userExists.verificationCode === data.verificationCode ) await this.userModel.updateOne({phoneNumber: data.phoneNumber}, { isVerified: true, verificationCode: "none" }).exec()
            
            else if ( verificationType === 'reset-password' && userExists.resetPasswordCode !== data.verificationCode ){
                return new BadRequestException("Verification code for password reset is incorrect. Please try again.")
            }
            
            else if ( verificationType === 'reset-password' && userExists.resetPasswordCode === data.verificationCode ) await this.userModel.updateOne({phoneNumber: data.phoneNumber}, { resetPasswordCode: "none" }).exec()

            if ( verificationType === 'reset-password' ) return { success: true, message: "Code verified. You can now reset your password."}

            return { success: true, message: "User verified successfully."}

            
            
        } catch (error) {
            return new InternalServerErrorException(error.message)
        }
    }

    async forgotPassword( data: Partial<User>) {
        try {
            
            if ( !data || !data.phoneNumber ){
                return new BadRequestException("Phone number is required to reset password.")
            }

            return await this.smsService.sendSms({ phoneNumber: data.phoneNumber}, "reset-password")
            
        } catch (error) {
            return new InternalServerErrorException(error.message)
        }
    }

    async resetPassword( data: PartialUser) {
        try {
            const { phoneNumber, newPassword} = data;

            if ( !data || !phoneNumber || !newPassword){
                return new BadRequestException("All fields are required to reset password.")
            }
            
            const userExists = await this.userModel.findOne({ phoneNumber: phoneNumber })
            
            if ( !userExists ){
                return new BadRequestException("User not found with this phone number.")
            }

            if ( userExists.resetPasswordCode !== "none" || userExists.resetPasswordRequested === false ){
                return new BadRequestException("Please request a new verification code to reset your password.")
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            return await this.userModel.updateOne({ phoneNumber: phoneNumber }, { password: hashedPassword, resetPasswordCode: "none", resetPasswordRequested:false }).exec()

        } catch (error) {
            return new InternalServerErrorException(error.message)
        }
    }
}
