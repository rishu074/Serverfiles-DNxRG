import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'

export default async function ApiLogin(req: Request, res: Response, next: NextFunction) {
    const USER_KEY = req.body?.["user_key"]
    const PASS_KEY = req.body?.["pass_key"]

    if(USER_KEY?.toString() != process.env.LOGIN_USERKEY || PASS_KEY?.toString() != process.env.LOGIN_PASSKEY) {
        return res.status(403).end("Wrong password!")
    }

    res.setHeader("Set-Cookie", cookie.serialize(
        "s_key",
        process.SessionKeys.session_key,
        {
            secure: process.env.SSL === "true"
        }
    ))


    return res.status(200).json({"xsrf": process.SessionKeys.xsrf_token})
}