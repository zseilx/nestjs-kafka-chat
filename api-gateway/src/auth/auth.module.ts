import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Oauth2Factory } from './oauth2.factory';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Oauth2Factory],
})
export class AuthModule {}
