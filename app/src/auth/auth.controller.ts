import { Controller } from '@nestjs/common';
import { Post, Request, HttpCode } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(ThrottlerGuard)
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('login')
  login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
