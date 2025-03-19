import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './config/logging-middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          imports: [ConfigModule],
          name: 'KAFKA_CLIENT',
          useFactory: async (configService: ConfigService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'api-gateway',
                brokers: [configService.get<string>('KAFKA_BROKER')],
              },
              consumer: {
                groupId: 'api-gateway-group',
              },
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).exclude('health/liveness', 'health/readiness').forRoutes('*');
  }
}
