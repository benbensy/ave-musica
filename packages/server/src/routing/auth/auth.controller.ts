import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.auth.signIn(signInDto.username, signInDto.password);
  }
}
