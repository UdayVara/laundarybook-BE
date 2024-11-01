import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import {  Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const path = ctx.getRequest().path;
    response.status(status).json({
      statusCode: status,
      path:path,
      message: exceptionResponse.message || exception.message,
      ...(exceptionResponse.error && { error: exceptionResponse.error }),
    });
  }
}
