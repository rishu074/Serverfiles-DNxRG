import {Request, Response, NextFunction} from 'express'

export default async function RenderFiles(req: Request, res: Response, next: NextFunction) {
    res.render("files.ejs")
}