import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: '+251912345678', description: 'Phone number of the user' })
  phoneNumber: string;
}
