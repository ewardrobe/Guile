import { Request, Response } from "express";

export interface ApiRequest extends Request {
    user: any;
}

export interface ApiResponse extends Response {
    
}