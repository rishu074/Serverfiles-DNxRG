import ErrorLog from "../loggers/error"
import WorkerLog from "../loggers/worker"
import fs from 'fs'

export default function RequestsHandlerWorker() {
    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/requests.json", {encoding: "utf-8"}))
    } catch (error) {
        ErrorLog("Json file not good")
        throw Error("The json file is not good")
    }

    for (let i = 0; i < process.RequestsMemoryDatabase.length; i++) {
        const element = process.RequestsMemoryDatabase[i];
        json_file.push(element)
    }

    fs.writeFileSync("./auth/requests.json", JSON.stringify(json_file, null, 2), {encoding: "utf-8"})

    WorkerLog("RequestsHandlerWorker run")
}