import {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import getFileHash from '../../utils/fileHash'
import getDirChecksum from '../../utils/folderHash'

export default async function GetFile(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    if(!fs.existsSync(absolute_path)) {
        return res.sendStatus(404)
    }

    if(req.query?.k && req.query?.k === "checksum") {
        let hash = crypto.createHash("sha512")
        let skat = fs.statSync(absolute_path)

        if(skat.isDirectory()) {
            hash = await getDirChecksum(absolute_path, hash)
        } else {
            await getFileHash(absolute_path, hash)
            
        }

        return res.end(hash.digest("hex"))
    } else{
        process.DownloadsData.push({
            time: Date.now(),
            file: absolute_path
        })
        res.sendFile(absolute_path)

    }
}