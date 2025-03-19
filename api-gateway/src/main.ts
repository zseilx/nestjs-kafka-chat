import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'api-gateway',
  //       brokers: ['localhost:9092'],
  //     },
  //   },
  // });

  // app.useGlobalFilters(new GlobalExceptionFilter()); // 현재 필요 없음.

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX || '/api');

  app.enableCors({
    exposedHeaders: ['content-disposition'],
    origin: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
