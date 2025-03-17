import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth2/:provider')
  async socialLogin(
    @Param('provider') provider: string,
    @Body('token') token: string,
  ) {
    return this.authService.validateSocialToken(provider, token);
  }
}
