import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Client, ClientKafkaProxy, Transport } from '@nestjs/microservices';
import * as process from 'node:process';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: [process.env.KAFKA_BROKER],
      },
    },
  })
  client: ClientKafkaProxy;

  constructor() {}
  // constructor(private readonly client: ClientKafkaProxy) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('findAllUsers');
  }

  @Get('health/liveness')
  async healthLiveness(): Promise<any> {
    return { status: 'ok' };
  }

  @Get('health/readiness')
  async healthReadiness(): Promise<any> {
    return { status: 'ok' };
  }

  @Get('/users')
  async queryUsers(): Promise<any> {
    console.log('api-gateway: called findAllUsers');
    return await lastValueFrom(this.client.send('user.query.list', {}));
  }

  @Post('/users')
  async commandUserCreate(): Promise<any> {
    // console.log('api-gateway: called createUser');
    // return await lastValueFrom(this.client.send('createUser', {}));
  }

  @Patch('/users/:id')
  async commandUserUpdate(): Promise<any> {
    // console.log('api-gateway: called updateUser');
    // return await lastValueFrom(this.client.send('updateUser', {}));
  }

  @Delete('/users/:id')
  async commandUserDelete(): Promise<any> {
    // console.log('api-gateway: called deleteUser');
    // return await lastValueFrom(this.client.send('deleteUser', {}));
  }
}
