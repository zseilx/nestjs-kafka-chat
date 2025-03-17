import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateSocialToken(provider: string, token: string) {
    // TODO: Implement social token validation
    return { token };
  }
}
