import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService) {}

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const format = exception.getResponse() as {
            key: string;
            args: Record<string, any>;
        };
        /**
         * Handle un-localized message
         */
        if (!format.key){
            const defaultMessage = exception.getResponse() as {
                statusCode: number;
                message: string;
            };
            return response
                .status(status)
                .json({
                    statusCode: defaultMessage.statusCode,
                    message: defaultMessage.message,
                    path: request.url,
                    timestamp: new Date().toISOString(),
                });
        }else{
            const msg = await this.i18n.translate(format.key, {
                lang: ctx.getRequest().i18nLang,
                args: format.args,
            });
            return response
                .status(status)
                .json({
                    statusCode: status,
                    message: msg,
                    path: request.url,
                    timestamp: new Date().toISOString(),
                });
        }
    }
}