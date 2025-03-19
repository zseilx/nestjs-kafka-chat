import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`[Request] ${req.ip} ${req.hostname} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);

    const start = Date.now();
    res.on('finish', () => {
      const elapsed = Date.now() - start;
      console.log(`[Response] ${req.hostname} ${req.method} ${req.url} ${res.statusCode} - ${elapsed}ms`);
    });

    next();
  }
}
