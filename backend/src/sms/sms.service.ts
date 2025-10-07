// sms.service.ts
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { randomInt } from 'crypto';
import { User } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Verification code generator function
function generate6DigitCode() {
    const n = randomInt(0, 1_000_000); // 0 .. 999999
    return n.toString().padStart(6, '0');
}

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly httpService: HttpService, @InjectModel(User.name) private userModel: Model<User>) {}

  async sendSms(data: Partial<User>, smsType:string) {

    if (!data.phoneNumber) {
      throw new BadRequestException("Phone number is required to send verification code");
    }

    const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber });
    if (!userExists) {
      throw new BadRequestException("No user found with this phone number");
    }
    
    
    const url = process.env.SMS_PROVIDER_URL;
    const apiKey = process.env.SMS_API_KEY; 
    const companyNumber = process.env.COMPANY_PHONE_NUMBER;
    const verificationCode = generate6DigitCode();
    const identifierID = process.env.IDENTIFIER_ID

    this.logger.log(url,apiKey,companyNumber,verificationCode,identifierID)

    if ( ! url || !apiKey || !companyNumber || !verificationCode || !identifierID || !smsType ) {
      throw new InternalServerErrorException("Some env properties were not found")
    }

    try {
      const message = `Your Azmera Bet ${smsType} code is: ${verificationCode}. This code will expire in 5 minutes. Do not share it with anyone.`
      const response = await firstValueFrom(
        this.httpService
          .post(
            url!,
            {
              from: identifierID,
              to: data.phoneNumber,
              message,
              callback:""
             
             
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
            },
          )
          .pipe(timeout(5000), catchError((err) => { throw err; })),
      );

    //   this.logger.log(`SMS sent to ${data.phoneNumber}: ${response.data}`);
      if (response.data.acknowledge){
        
        if (smsType==='verification') this.userModel.updateOne({ phoneNumber: data.phoneNumber }, { verificationCode: verificationCode }).exec();
        else if (smsType==="reset-password") this.userModel.updateOne({ phoneNumber: data.phoneNumber }, { resetPasswordCode: verificationCode, resetPasswordRequested: true }).exec();

        return { message: 'SMS sent successfully', verificationCode: verificationCode }; // Return the code for testing purposes
      }

      return new Error('SMS provider did not acknowledge the request');

    } catch (error) {
      this.logger.error(`Failed to send SMS: ${error.message}`);
      return new Error('SMS sending failed');
    }
  }
}
