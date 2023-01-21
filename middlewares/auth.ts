import {Request, Response, NextFunction} from 'express'

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    let XSRF_TOKEN = req.headers?.['xsrf']
    let SESSION_KEY = req.cookies?.['s_key']

    if(!XSRF_TOKEN || !SESSION_KEY) return res.status(401).render("loading.ejs")
}