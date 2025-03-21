import { Express, static as st } from "express";
import IpCheckersMiddleware from "../middlewares/ip_checkers";
import InfoLog from "../loggers/info";
import StartWorkers from "../workers/HandleWorkers";
import GetFile from "./files/get_file";
import RenderIndex from "./renders";
import AuthMiddleware from "../middlewares/auth";
import path from 'path'
import LoginRoute from "./renders/login";
import cp from 'cookie-parser'
import bp from 'body-parser'
import ApiLogin from "./api/login";
import ListenToCommands from "../interface/commandListener";
import GetDownloads from "./api/get_downloads";
import GetRequests from "./api/get_requests";
import ListFiles from "./files/list_file";
import RenderFiles from "./renders/files";
import UploadFile from "./api/upload_file";
import fileUpload from "express-fileupload";
import DeleteFile from "./api/delete";
import CreateFolder from "./api/create_folder";
import WhitelistRender from "./renders/whitelist";
import LogsRender from "./renders/logs";
import GetWhitelist from "./api/whitelist/get";
import AddWhitelist from "./api/whitelist/add";
import RemoveWhitelist from "./api/whitelist/delete";
import { GetRequestsFull } from "./api/get_requests";
import GetMyIP from "./api/get_ip";

export default async function RegisterRoutes(app: Express) {
    InfoLog("Registering routes and middlewares")
    app.use(IpCheckersMiddleware)
    app.use(st(path.join(process.cwd(), "public")))
    app.use(cp())

    // non-authenticated routes
    app.get("/login", LoginRoute)
    app.post("/login", bp.json(), ApiLogin)
    app.get("/file/*", GetFile)


    app.get("/", AuthMiddleware, RenderIndex)
    app.get("/downloads", AuthMiddleware, GetDownloads)
    app.get("/reqs", AuthMiddleware, GetRequests)
    app.get("/requests", AuthMiddleware, GetRequestsFull)
    app.get("/whitelist", AuthMiddleware, WhitelistRender)
    app.get("/logs", AuthMiddleware, LogsRender)
    app.get("/ip", AuthMiddleware, GetMyIP)
    app.get("/api/list/*", AuthMiddleware, ListFiles)
    app.get("/files/*", AuthMiddleware, RenderFiles)
    app.delete("/delete/*", AuthMiddleware, DeleteFile)
    app.post("/create/*", AuthMiddleware, bp.json(), CreateFolder)
    app.post("/upload", AuthMiddleware, fileUpload({
        limits: {fileSize: 1e+9},
        tempFileDir: "./saved_files",
        useTempFiles: true
    }), UploadFile)

    // whitelist
    app.get("/api/whitelist", AuthMiddleware, GetWhitelist)
    app.post("/api/whitelist", AuthMiddleware, AddWhitelist)
    app.delete("/api/whitelist", AuthMiddleware, RemoveWhitelist)
    
    app.use((req, res) => res.sendStatus(404))
    // start the workers
    StartWorkers(() => InfoLog("Registered all the workers"))
    ListenToCommands(() => InfoLog("Listening to input"))
}