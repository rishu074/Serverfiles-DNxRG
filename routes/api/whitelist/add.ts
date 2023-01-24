import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

export default async function AddWhitelist(req: Request, res: Response, next: NextFunction) {
    if (!req.query?.["t"]) {
        return res.sendStatus(400)
    }

    try {
        let whitelistedIPS = JSON.parse(fs.readFileSync('./auth/ips_whitelist.json', { encoding: "utf-8" }))
        whitelistedIPS.push(req.query?.["t"])
        process.WhitelistedIPS = whitelistedIPS
        fs.writeFileSync('./auth/ips_whitelist.json', JSON.stringify(whitelistedIPS, null, 2), { encoding: "utf-8" })

        return res.sendStatus(201)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }


}