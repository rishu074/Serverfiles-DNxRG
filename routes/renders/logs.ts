import {Request, Response, NextFunction} from 'express'

export default async function LogsRender(req: Request, res: Response, next: NextFunction) {
    res.render("logs.ejs")
}