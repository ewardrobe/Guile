import debug from 'debug';

export interface LogInterface {
    debug(message:string | any[], ...supportingData: any[]):void;
    warn(message:string | any[], ...supportingData: any[]):void;
    error(message:string | any[], ...supportingData: any[]):void;
    info(message:string | any[], ...supportingData: any[]):void;
}

class Log implements LogInterface {
    public logger: debug.Debug;
    constructor(Debug: debug.Debug) {
        this.logger = Debug;
    }

    public debug(message: string | any[]) {
        this.logger('app:debug')(message);
    }

    public error(message: string | any[]) {
        this.logger('app:error')(message);
    }

    public info(message: string | any[]) {
        this.logger('app:info')(message);
    }

    public warn(message: string | any[]) {
        this.logger('app:warn')(message);
    }
}

const Logger = new Log(debug);

export default Logger;
