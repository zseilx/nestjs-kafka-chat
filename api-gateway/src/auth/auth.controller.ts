import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Oauth2Provider } from './oauth2.factory';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth2/:provider')
  async socialLogin(
    @Param('provider') provider: Oauth2Provider,
    @Body() request: { accessToken: string; refreshToken: string },
  ) {
    return this.authService.socialLogin(provider, request);
  }
}
