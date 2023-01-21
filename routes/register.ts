import { Express, static as st } from "express";
import IpCheckersMiddleware from "../middlewares/ip_checkers";
import InfoLog from "../loggers/info";
import StartWorkers from "../workers/HandleWorkers";
import GetFile from "./files/get_file";
import RenderIndex from "./renders";
import AuthMiddleware from "../middlewares/auth";
import path from 'path'
import LoginRoute from "./renders/login";

export default async function RegisterRoutes(app: Express) {
    InfoLog("Registering routes and middlewares")
    app.use(IpCheckersMiddleware)
    app.use(st(path.join(process.cwd(), "public")))

    app.get("/", AuthMiddleware, RenderIndex)
    app.get("/login", LoginRoute)
    app.get("/file/*", GetFile)
    
    app.use((req, res) => res.sendStatus(404))
    // start the workers
    StartWorkers(() => InfoLog("Registered all the workers"))
}