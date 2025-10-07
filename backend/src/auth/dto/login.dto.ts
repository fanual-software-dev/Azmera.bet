import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '+251912345678', description: 'Registered phone number' })
  phoneNumber: string;

  @ApiProperty({ example: 'strongPassword123', description: 'User password' })
  password: string;
}
