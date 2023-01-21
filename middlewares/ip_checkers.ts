import {Request, Response, NextFunction} from 'express'
import CreateRequestLog from '../loggers/request'
import ErrorLog from '../loggers/error'

export default function IpCheckersMiddleware(req: Request, res: Response, next: NextFunction) {
    const REQUEST_IP = req.socket.remoteAddress || req.headers['x-forwarded-for']
    if(!REQUEST_IP) {
        res.status(500).send("Server side error, Please contact any admin")
    }

    // log to requests
    try {
        CreateRequestLog(REQUEST_IP as string, req.originalUrl ,req.headers['user-agent'] as string)
    } catch (error: any) {
        ErrorLog(error)
        return res.status(500).end("Server side error, Please contact any admin")
    }

    next()
}