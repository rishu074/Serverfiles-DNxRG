import {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import path from 'path'

export default async function GetFile(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    if(!fs.existsSync(absolute_path)) {
        return res.sendStatus(404)
    }


    res.sendFile(absolute_path)
}