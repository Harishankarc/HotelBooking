import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ){}

  @Post('register')
  async register(@Body() userData: Prisma.UsersCreateInput){
    return await this.userService.register(userData);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh(@Body()body: { refresh_token: string }){
    return this.authService.refresh(body.refresh_token);
  }

}
