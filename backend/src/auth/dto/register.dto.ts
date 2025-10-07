import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  fullName: string;

  @ApiProperty({ example: '+251912345678', description: 'Phone number of the user' })
  phoneNumber: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  password: string;
}
