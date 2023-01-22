import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'
import path from 'path';
import humanizeDuration from 'humanize-duration';

export default async function ListFiles(req: Request, res: Response, next: NextFunction) {
    const PATH_TO_FILE = req.params['0']
    const absolute_path = path.join(process.cwd(), "saved_files/", PATH_TO_FILE)
    if(!fs.existsSync(absolute_path)) {
        return res.sendStatus(404)
    }

    try {
        var data = fs.readdirSync(absolute_path)

    } catch (error) {
        return res.sendStatus(500)
    }
    let data_to_return: Array<{
        name: string,
        isDir: boolean,
        size: number,
        last_modified: string,
        created: string
    }> = []


    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let stats = fs.statSync(absolute_path + "/" + element)
        data_to_return.push({
            name: element,
            isDir: stats.isDirectory(),
            last_modified: humanizeDuration(Date.now() - stats.mtimeMs, {round: true}) + " ago",
            created: humanizeDuration(Date.now() - stats.mtimeMs, {round: true}) + " ago",
            size: stats.size
        })
    }
    // console.log(stats)

    return res.json(data_to_return)
}