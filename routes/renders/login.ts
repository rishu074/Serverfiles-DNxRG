import {Request, Response, NextFunction} from 'express'

export default async function LoginRoute(req: Request, res: Response, next: NextFunction) {
    res.render("login.ejs")
}