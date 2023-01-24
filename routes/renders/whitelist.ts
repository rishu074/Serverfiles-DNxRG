import {Request, Response, NextFunction} from 'express'

export default async function WhitelistRender(req: Request, res: Response, next: NextFunction) {
    res.render("whitelist.ejs")
}