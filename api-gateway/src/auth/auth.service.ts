import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { Oauth2Factory, Oauth2Provider } from './oauth2.factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly oauth2Factory: Oauth2Factory,
    private readonly prismaService: PrismaService,
    @Inject('KAFKA_CLIENT') private readonly client: ClientKafka,
  ) {}
  async socialLogin(provider: Oauth2Provider, request: { accessToken: string; refreshToken: string }) {
    // TODO: Implement social token validation
    const oauth2Provider = this.oauth2Factory.getProvider(provider);

    const providerId = await oauth2Provider.verifyToken(request.accessToken);

    const auth = await this.prismaService.socialAuth.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
    });

    if (!auth) {
      const userInfo = await oauth2Provider.getUserInfo(request.accessToken);
    }
  }
}
