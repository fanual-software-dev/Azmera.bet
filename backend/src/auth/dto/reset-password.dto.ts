import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: '+251912345678', description: 'Phone number of the user' })
  phoneNumber: string;

  @ApiProperty({ example: '123456', description: 'Verification code sent via SMS' })
  verificationCode: string;

  @ApiProperty({ example: 'newStrongPassword123', description: 'The new password to set' })
  newPassword: string;
}
