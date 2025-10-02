import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post('/send')
    async create(@Body() body: { phoneNumber : string } ){
        
        return this.smsService.sendSms(body);
        
    }
}