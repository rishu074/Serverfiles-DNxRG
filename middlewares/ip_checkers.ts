import {Request, Response, NextFunction} from 'express'
import InfoLog from '../loggers/info'

export default function IpCheckersMiddleware(req: Request, res: Response, next: NextFunction) {
    const REQUEST_IP = req.socket.remoteAddress || req.headers['x-forwarded-for']
    if(!REQUEST_IP) {
        res.status(500).send("Server side error, Please contact any admin")
    }

    // log to requests

    next()
}