import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'
import { removeFileFromDb, HandleNestedHashRemove } from '../../interface/hashDbFunctions'
import path from 'path'

export default async function UploadFile(req: Request, res: Response, next: NextFunction) {
    if(!req.files?.file || !req.body?.path) {
        return res.sendStatus(500)
    }
    let file: any = req.files?.file
    removeFileFromDb(path.join(process.cwd(), "saved_files" + req.body?.path + file.name))
    HandleNestedHashRemove(path.join(process.cwd(), "saved_files" + req.body?.path + file.name))

    file.mv("./saved_files" + req.body?.path + file.name)
    return res.sendStatus(200)
}