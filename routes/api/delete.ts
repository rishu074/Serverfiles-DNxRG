import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { removeFileFromDb, removeFolderFromDB, HandleNestedHashRemove } from '../../interface/hashDbFunctions'

export default async function DeleteFile(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    if(!fs.existsSync(absolute_path)) {
        return res.sendStatus(404)
    }

    let stats = fs.statSync(absolute_path)

    try {
        if(stats.isDirectory()) {
            removeFolderFromDB(absolute_path)
            rimraf.sync(absolute_path)
        } else {
            removeFileFromDb(absolute_path)
            fs.rmSync(absolute_path)
        }

        HandleNestedHashRemove(absolute_path)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    return res.sendStatus(201)
}