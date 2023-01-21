import {Request, Response, NextFunction} from 'express'

export default async function RenderIndex(req: Request, res: Response, next: NextFunction) {
    res.render("loading.ejs")
}