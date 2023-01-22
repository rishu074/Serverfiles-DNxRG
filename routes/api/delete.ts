import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

export default async function DeleteFile(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    if(!fs.existsSync(absolute_path)) {
        return res.sendStatus(404)
    }

    let stats = fs.statSync(absolute_path)

    try {
        if(stats.isDirectory()) {
            rimraf.sync(absolute_path)
        } else {
            fs.rmSync(absolute_path)
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    return res.sendStatus(201)
}