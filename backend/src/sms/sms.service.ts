// sms.service.ts
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { randomInt } from 'crypto';
import { User } from 'src/users/user.schema';

// Verification code generator function
function generate6DigitCode() {
    const n = randomInt(0, 1_000_000); // 0 .. 999999
    return n.toString().padStart(6, '0');
}

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly httpService: HttpService) {}

  async sendSms(data: Partial<User>) {
    const url = process.env.SMS_PROVIDER_URL;
    const apiKey = process.env.SMS_API_KEY; 
    const companyNumber = process.env.COMPANY_PHONE_NUMBER;
    const verificationCode = generate6DigitCode();
    const identifierID = process.env.IDENTIFIER_ID

    this.logger.log(url,apiKey,companyNumber,verificationCode,identifierID)

    if ( ! url || !apiKey || !companyNumber || !verificationCode || !identifierID ) {
        throw new InternalServerErrorException("Some env properties were nor found")
    }

    try {
      const response = await firstValueFrom(
        this.httpService
          .post(
            url!,
            {
              from: identifierID,
              to: data.phoneNumber,
              message: `"Your Azmera Bet verification code is: ${verificationCode}. This code will expire in 5 minutes. Do not share it with anyone."`,
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
      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error(`Failed to send SMS: ${error.message}`);
      throw new Error('SMS sending failed');
    }
  }
}
