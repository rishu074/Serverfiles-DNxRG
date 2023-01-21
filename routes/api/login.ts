import {Request, Response, NextFunction} from 'express'

export default async function ApiLogin(req: Request, res: Response, next: NextFunction) {
    res.render("login.ejs")
}