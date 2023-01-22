import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

export default async function CreateFolder(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    let folder_name = req.body?.folder_name
    if(!folder_name || !/^[a-zA-Z0-9_-]{1,160}$/.test(folder_name)) return res.sendStatus(400)
    
    if(fs.existsSync(path.join(absolute_path, folder_name))) {
        return res.sendStatus(409)
    }
    try {
        fs.mkdirSync(path.join(absolute_path, folder_name))
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
    return res.sendStatus(201)
}