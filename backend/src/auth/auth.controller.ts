import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LogoutDTO } from './dto/logout.dto';
import { NewAccessTokenDTO } from './dto/new-access-token.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() body: RegisterDto) {
        
        return this.authService.create(body) 

    }

    @Post('/login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
    async login(@Body() body: LoginDto){

        return this.authService.login(body)
        
    }

    @Post('/logout')
    @ApiOperation({ summary: 'Logout a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged out.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async logout(@Body() body: LogoutDTO){
        return this.authService.logout(body.phoneNumber, body.refreshToken)
    }

    @Post('access-token')
    @ApiOperation({ summary: 'Generate a new access token using refresh token' })
    @ApiResponse({ status: 200, description: 'New access token generated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid refresh token.' })
    async generateAccessToken(@Body() body: NewAccessTokenDTO) {
        return this.authService.generateNewAccessToken(body.phoneNumber, body.refreshToken);
    }

    @Post('/verify')
    @ApiOperation({ summary: 'Verify phone number with code' })
    @ApiQuery({ name: 'verificationType', required: false, example: 'verification', description: 'Type of verification (e.g. verification, reset-password)' })
    @ApiResponse({ status: 200, description: 'Verification successful.' })
    @ApiResponse({ status: 400, description: 'Invalid or expired verification code.' })
    async verify(@Body() body: VerifyDto, @Query('verificationType') verificationType: string = "verification"){
        
        return this.authService.verify(body, verificationType)
    }

    @Post('/forgot-password')
    @ApiOperation({ summary: 'Request a password reset' })
    @ApiResponse({ status: 200, description: 'Password reset code sent via SMS.' })
    async forgotPassword(@Body() body: ForgotPasswordDto){
        return this.authService.forgotPassword(body)
    }

    @Post('/reset-password')
    @ApiOperation({ summary: 'Reset password with verification code' })
    @ApiResponse({ status: 200, description: 'Password successfully reset.' })
    @ApiResponse({ status: 400, description: 'Invalid reset request.' })
    async resetPassword(@Body() body: ResetPasswordDto){
        return this.authService.resetPassword(body)
    }
}
