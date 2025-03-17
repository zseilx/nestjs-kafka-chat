import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

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
