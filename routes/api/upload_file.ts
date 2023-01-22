import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'

export default async function UploadFile(req: Request, res: Response, next: NextFunction) {
    if(!req.files?.file || !req.body?.path) {
        return res.sendStatus(500)
    }
    let file: any = req.files?.file

    file.mv("./saved_files" + req.body?.path + file.name)
    return res.sendStatus(200)
}