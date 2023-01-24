import {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import getFileHash from '../../utils/fileHash'
import getDirChecksum from '../../utils/folderHash'
import { LoadInDatabase, getFromDatabase } from '../../interface/hashDbFunctions'

export default async function GetFile(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    if(!fs.existsSync(absolute_path)) {
        return res.sendStatus(404)
    }

    if(req.query?.k && req.query?.k === "checksum") {
        let fromDb = getFromDatabase(absolute_path)
        if(fromDb) {
            console.log("db", process.HashDatabase)
            return res.end(fromDb.hash)
        }

        let hash = crypto.createHash("sha512")
        let skat = fs.statSync(absolute_path)

        if(skat.isDirectory()) {
            hash = await getDirChecksum(absolute_path, hash)
        } else {
            await getFileHash(absolute_path, hash)
        }
        let dige = hash.digest("hex")
        LoadInDatabase(absolute_path, dige, skat.isDirectory())
        // console.log(process.HashDatabase)

        return res.end(dige)
    } else{
        process.DownloadsData.push({
            time: Date.now(),
            file: absolute_path
        })
        res.sendFile(absolute_path)

    }
}