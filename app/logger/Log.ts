import Debug from 'debug';

export interface LogInterface {
    debug(message:string | any[], ...supportingData: any[]):void;
    warn(message:string | any[], ...supportingData: any[]):void;
    error(message:string | any[], ...supportingData: any[]):void;
    info(message:string | any[], ...supportingData: any[]):void;
}

class Log implements LogInterface {
    logger: debug.Debug;
    constructor(Debug: Debug.Debug) {
        this.logger = Debug;
    }

    debug(message: string | any[]) {
        this.logger('app:debug')(message);
    }

    error(message: string | any[]) {
        this.logger('app:error')(message);
    }

    info(message: string | any[]) {
        this.logger('app:info')(message);
    }

    warn(message: string | any[]) {
        this.logger('app:warn')(message);
    }
}

const Logger = new Log(Debug);

export default Logger;
