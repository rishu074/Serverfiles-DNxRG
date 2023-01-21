import ErrorLog from "../loggers/error"
import WorkerLog from "../loggers/worker"
import fs from 'fs'

export default function RequestsLogPretty() {
    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/requests.json", {encoding: "utf-8"}))
    } catch (error) {
        ErrorLog("Json file not good")
        throw Error("The json file is not good")
    }

    let requests_per_second = 0

    for (let i = 0; i < json_file.requests.length; i++) {
        const element = json_file.requests[i];
        if((Date.now() - element.timestamp) < 1000) {
            requests_per_second++
        } else if ((Date.now() - element.timestamp) > 5000) {
            json_file.requests.splice(json_file.requests[i], 1) 
        }
    }

    json_file.per_sec = requests_per_second

    fs.writeFileSync("./auth/requests.json", JSON.stringify(json_file, null, 2), {encoding: "utf-8"})
    process.RequestsMemoryDatabase = []

    WorkerLog("RequestsLogPretty run")
}