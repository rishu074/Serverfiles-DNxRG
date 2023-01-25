import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'

export default async function GetMyIP(req: Request, res: Response, next: NextFunction) {
    const REQUEST_IP = req.socket.remoteAddress || req.headers['x-forwarded-for']
    return res.send(REQUEST_IP)
}