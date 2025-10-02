import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async create(@Body() body:{ fullName: string, phoneNumber: string, password: string }) {
        
        return this.authService.create(body) 

    }

    @Post('/login')
    async login(@Body() body:{ phoneNumber: string, password: string }){

        return this.authService.login(body)
        
    }
}
