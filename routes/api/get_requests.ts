import {Request, Response, NextFunction} from 'express'
import cookie from 'cookie'
import fs from 'fs'

export default async function GetRequests(req: Request, res: Response, next: NextFunction) {
    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/requests.json", {encoding: "utf-8"}))
    } catch (error) {
        return res.sendStatus(500)
    }

    return res.status(200).json(json_file.per_sec)
}