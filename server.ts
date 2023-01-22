import express from 'express';
import dotenv from 'dotenv';
import RegisterRoutes from './routes/register';
import InfoLog from './loggers/info';
import fs from 'fs';
import path from 'path';
dotenv.config()

const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "themes", process.env.THEME));

// @ts-ignore
process.RequestsMemoryDatabase = []
process.DownloadsData = []

let whitelistedIPS = JSON.parse(fs.readFileSync('./auth/ips_whitelist.json', {encoding:"utf-8"}))
process.WhitelistedIPS = whitelistedIPS

process.SessionKeys = JSON.parse(fs.readFileSync('./auth/session.json', {encoding:"utf-8"}))


if (!process.env.PORT) {
    throw new Error("No env variable port found")
}

app.listen(process.env.PORT, () => {
    InfoLog(`Application started on PORT ${process.env.PORT}`)
    return RegisterRoutes(app)
})