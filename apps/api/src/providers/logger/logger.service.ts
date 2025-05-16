import { Injectable, Inject, LoggerService as NestLoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    ) { }

    log(message: any, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: any, trace?: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    warn(message: any, context?: string) {
        this.logger.warn(message, { context });
    }

    debug?(message: any, context?: string) {
        this.logger.debug(message, { context });
    }

    verbose?(message: any, context?: string) {
        this.logger.verbose(message, { context });
    }
}
