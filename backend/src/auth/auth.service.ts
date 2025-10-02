import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt'
import { randomInt } from 'crypto';


// Verification code generator function
function generate6DigitCode() {
    const n = randomInt(0, 1_000_000); // 0 .. 999999
    return n.toString().padStart(6, '0');
}

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

            
            const isMatch = await bcrypt.compare(data.password, userExists.password)

            if ( !isMatch ){
                throw new BadRequestException("Phone number or password is incorrect. Please try again")
            }

            return userExists


        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        
    }

    async requestVerification( data: Partial<User>) {

        try {

            if ( !data || !data.phoneNumber ){
                throw new BadRequestException(" Phone number not provided. Please provide your phone number.")
            }

            const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber })

            if ( !userExists ){

                throw new BadRequestException("User not found with this phone number.")
            }

            const verificationCode = generate6DigitCode()

            
            
        } catch (error) {
            
        }
    }
}
