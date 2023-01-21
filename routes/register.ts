import { Express } from "express";
import IpCheckersMiddleware from "../middlewares/ip_checkers";
import InfoLog from "../loggers/info";
import StartWorkers from "../workers/HandleWorkers";

export default async function RegisterRoutes(app: Express) {
    InfoLog("Registering routes and middlewares")
    app.use(IpCheckersMiddleware)
    app.use((req, res) => res.end('Hi'))

    // start the workers
    StartWorkers(() => InfoLog("Registered all the workers"))
}