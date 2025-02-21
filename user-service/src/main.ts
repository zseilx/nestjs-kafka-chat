import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user-service',
          brokers: [process.env.KAFKA_BROKER],
        },
        consumer: {
          groupId: 'user-service-group', // 유니크하게 지정할 것
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
