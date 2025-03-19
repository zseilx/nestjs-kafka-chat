import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.log(exception);
    console.log('GlobalExceptionFilter catch');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.message);
      return;
    }

    response.status(500).json('Internal server error');
  }
}
