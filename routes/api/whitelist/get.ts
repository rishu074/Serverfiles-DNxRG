import {Request, Response, NextFunction} from 'express'
import fs from 'fs'

export default async function GetWhitelist(req: Request, res: Response, next: NextFunction) {
    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/ips_whitelist.json", {encoding: "utf-8"}))
    } catch (error) {
        return res.sendStatus(500)
    }

    return res.status(200).json(json_file)
}