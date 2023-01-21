import ErrorLog from "./error";
import fs from 'fs';

export default function CreateRequestLog(ip: string, path: string, ua: string) {
    if(!fs.existsSync("./auth/requests.json")) {
        ErrorLog("The file auth/requests.json not found")
        throw Error("The file auth/requests.json not found")
    }

    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/requests.json", {encoding: "utf-8"}))
    } catch (error) {
        ErrorLog("Json file not good")
        throw Error("The json file is not good")
    }

    try {
        json_file.push(
            `${}`
        )
    } catch (error) {
        ErrorLog("Not good json file")
        throw Error("Not good json file")
    }
}