import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  async validateSocialToken(provider: string, token: string) {
    // TODO: Implement social token validation
    return { token };
  }
}
