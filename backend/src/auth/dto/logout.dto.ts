import { ApiProperty } from "@nestjs/swagger";

export class LogoutDTO {
    
    @ApiProperty({ example: '+251923456788', description: 'Phone number of the user' })
    phoneNumber: string;

    @ApiProperty({ example: 'refreshTokenString', description: 'Refresh token of the current user' })
    refreshToken: string;
}