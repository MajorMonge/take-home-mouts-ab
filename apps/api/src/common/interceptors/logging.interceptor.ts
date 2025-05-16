import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../../providers/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, headers } = request;
        const now = Date.now();

        this.logger.log(
            `Incoming Request: ${method} ${url}`,
            JSON.stringify({ headers, body }),
        );

        return next
            .handle()
            .pipe(
                tap((data) => {
                    this.logger.log(
                        `Response for ${method} ${url} - Status: ${context.switchToHttp().getResponse().statusCode} - Duration: ${Date.now() - now}ms`,
                        JSON.stringify({ body: data }),
                    );
                }),
            );
    }
}