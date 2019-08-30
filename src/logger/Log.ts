import winston from 'winston';

const myFormat = winston.format.printf(error => {
    if(error instanceof Error) {
        return `${error.timestamp} [${error.label}] ${error.level}: ${error.message} ${error.stack}`;
    }
    return `${error.timestamp} [${error.label}] ${error.level}: ${error.message}`;
});

const logger = winston.createLogger({
    format: myFormat,
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}



export interface LogInterface {
    debug(message: any): void;
    warn(message: any): void;
    error(message: any): void;
    info(message: any): void;
}

class Log implements LogInterface {
    public logger: winston.Logger;
    constructor(Debug: winston.Logger) {
        this.logger = Debug;
    }

    public debug(message: any): void {
        this.logger.debug(message);
    }

    public error(message: any): void {
        this.logger.error(message);
    }

    public info(message: any): void {
        this.logger.info(message);
    }

    public warn(message: any): void {
        this.logger.warn(message);
    }
}

const Logger = new Log(logger);

export default Logger;
