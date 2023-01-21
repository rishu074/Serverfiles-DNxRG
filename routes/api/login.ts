import {Request, Response, NextFunction} from 'express'

export default async function ApiLogin(req: Request, res: Response, next: NextFunction) {
    const USER_KEY = req.body?.["user_key"]
    const PASS_KEY = req.body?.["pass_key"]

    if(USER_KEY?.toString() != process.env.LOGIN_USERKEY || PASS_KEY?.toString() != process.env.LOGIN_PASSKEY) {
        return res.status(403).end("Wrong password!")
    }

    return res.sendStatus(200)
}