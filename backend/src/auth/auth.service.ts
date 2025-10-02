import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt'






@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
    async create(data: Partial<User>) {
        try {
            if (!data || !data.phoneNumber || !data.password) {
                throw new BadRequestException('Please provide a phone number.');
            }

            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber });

            if (userExists) {
                throw new BadRequestException('User already exists with this phone number.');
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = new this.userModel({ ...data, password: hashedPassword });

            return user.save();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async login( data: Partial<User>) {

        try {

            if ( !data || !data.phoneNumber || !data.password){
                throw new BadRequestException('please fill all te reuired fields.')
            }
            
            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber })
            if ( !userExists ) {
                throw new BadRequestException('User not found with this phone number.')
            }

            if ( !userExists.isVerified ){
                throw new BadRequestException("User is not verified. Please verify your account first.")
            }

            const isMatch = await bcrypt.compare(data.password, userExists.password)

            
            if ( !isMatch ){
                throw new BadRequestException("Phone number or password is incorrect. Please try again")
            }

            return userExists


        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        
    }

    async verify( data: Partial<User>) {

        try {

            if ( !data || !data.phoneNumber || !data.verificationCode ){
                throw new BadRequestException(" Phone number or verification code  not provided. Please provide your phone number.")
            }

            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber })

            if ( !userExists ){

                throw new BadRequestException("User not found with this phone number.")
            }

            if ( userExists.isVerified ){
                throw new BadRequestException("User is already verified.")
            }

            if ( userExists.verificationCode !== data.verificationCode ){
                throw new BadRequestException("Verification code is incorrect. Please try again.")
            }
            
            await this.userModel.updateOne({phoneNumber: data.phoneNumber}, { isVerified: true, verificationCode: "none" }).exec()

            return { success: true, message: "User verified successfully."}

            
            
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
