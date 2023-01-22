import ErrorLog from "../loggers/error"
import WorkerLog from "../loggers/worker"
import fs from 'fs'

export default function DownloadsSaverWorker() {
    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/downloads.json", {encoding: "utf-8"}))
    } catch (error) {
        ErrorLog("Json file not good")
        throw Error("The json file is not good")
    }

    for (let i = 0; i < process.DownloadsData.length; i++) {
        const element = process.DownloadsData[i];
        json_file.downloads.push(element)
    }
    json_file.total = json_file.downloads.length

    fs.writeFileSync("./auth/downloads.json", JSON.stringify(json_file, null, 2), {encoding: "utf-8"})
    process.DownloadsData = []

    WorkerLog("DownloadsSaverWorker run")
}