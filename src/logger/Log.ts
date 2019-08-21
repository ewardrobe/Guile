import debug from 'debug';

export interface LogInterface {
    debug(message: any): void;
    warn(message: any): void;
    error(message: any): void;
    info(message: any): void;
}

class Log implements LogInterface {
    public logger: debug.Debug;
    constructor(Debug: debug.Debug) {
        this.logger = Debug;
    }

    public debug(message: any): void {
        this.logger('app:debug')(message);
    }

    public error(message: any): void {
        this.logger('app:error')(message);
    }

    public info(message: any): void {
        this.logger('app:info')(message);
    }

    public warn(message: any): void {
        this.logger('app:warn')(message);
    }
}

const Logger = new Log(debug);

export default Logger;
