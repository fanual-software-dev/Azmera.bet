import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { SmsModule } from 'src/sms/sms.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    SmsModule, 
    PassportModule,
    JwtModule.register({})
  ],
  providers: [
    AuthService, 
    JwtStrategy, 
    RefreshTokenStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
