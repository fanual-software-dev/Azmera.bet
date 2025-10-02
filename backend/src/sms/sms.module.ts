import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { HttpModule} from '@nestjs/axios';
import { User, UserSchema } from 'src/users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  providers: [SmsService],
  controllers: [SmsController]
})
export class SmsModule {

}
