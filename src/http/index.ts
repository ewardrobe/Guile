import { Request, Response, NextFunction } from "express";

export interface AppRequest extends Request {
    user: any;
}

export interface AppResponse extends Response {
    
}

export interface AppNextFunction extends NextFunction {
    
}