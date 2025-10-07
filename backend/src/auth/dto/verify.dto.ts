import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @ApiProperty({ example: '+251912345678', description: 'Phone number to verify' })
  phoneNumber: string;

  @ApiProperty({ example: '123456', description: 'Verification code sent via SMS' })
  verificationCode: string;
}
