import winston from 'winston';

const myFormat = winston.format.printf(info => {
    if(info instanceof Error) {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: 'ewardrobe' }),
        winston.format.timestamp(),
        winston.format.splat(),
        myFormat
    ),
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    transports: [
        new winston.transports.File({ filename: 'logs/combined.log', level: 'info' })
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
