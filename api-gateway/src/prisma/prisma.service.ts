import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult, PaginationOptions } from './pagination';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {
    // pass PrismaClientOptions e.g. logging levels or error formatting
    super({
      log: [
        {
          level: configService.get('PRISMA_LOG'),
          emit: 'stdout',
        },
      ],
    });
    // this.$extends({
    //   model: {
    //     organization: {
    //       updateWithoutUpdatedAt(args: any) {
    //         const { data, ...restArgs } = args;
    //         delete data.updatedAt; // updatedAt 제거
    //         return this.example.update({ ...restArgs, data });
    //       },
    //     },
    //     space: {
    //       updateWithoutUpdatedAt(args: any) {
    //         const { data, ...restArgs } = args;
    //         delete data.updatedAt; // updatedAt 제거
    //         return this.example.update({ ...restArgs, data });
    //       },
    //     },
    //     user: {
    //       updateWithoutUpdatedAt(args: any) {
    //         const { data, ...restArgs } = args;
    //         delete data.updatedAt; // updatedAt 제거
    //         return this.example.update({ ...restArgs, data });
    //       },
    //     },
    //   },
    // });
  }

  async onModuleInit() {
    // this.$on('query', (e: Prisma.QueryEvent) => {
    //   if (e.query === 'SELECT 1') return; // Health check query
    //   console.info('Params: ' + e.params);
    //   console.info('Duration: ' + e.duration + 'ms');
    // });

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async fetchPaginatedResult<T, S>(
    Ctor: new (...args: any[]) => T,
    model: Prisma.ModelName,
    { page = 1, take = 10, order = 'desc' }: PaginationOptions,
    search?: S,
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * take;

    // 모델을 동적으로 참조
    const modelRef = this[model];

    const [results, totalRow] = await Promise.all([
      modelRef.findMany({
        skip,
        take,
        where: search,
        orderBy: {
          id: order,
        },
      }),
      modelRef.count({
        where: search,
      }),
    ]);

    return {
      // data: results.map((result) => new T(result)),
      data: results.map((result) => plainToInstance(Ctor, result)),

      paging: {
        currentPage: page,
        take: take,
        totalRow,
      },
    };
  }
}
