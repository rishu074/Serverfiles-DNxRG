import express from 'express';
import dotenv from 'dotenv';
import RegisterRoutes from './routes/register';
import InfoLog from './loggers/info';
import fs from 'fs';
dotenv.config()

const app = express()
interface Process {
    RequestsMemoryDatabase: Array<{
        ip: string,
        ua: string,
        path: string
    }>
}

// @ts-ignore
process.RequestsMemoryDatabase = []

let whitelistedIPS = JSON.parse(fs.readFileSync('./auth/ips_whitelist.json', {encoding:"utf-8"}))
process.WhitelistedIPS = whitelistedIPS


if (!process.env.PORT) {
    throw new Error("No env variable port found")
}

app.listen(process.env.PORT, () => {
    InfoLog(`Application started on PORT ${process.env.PORT}`)
    return RegisterRoutes(app)
})