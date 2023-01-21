import ErrorLog from "./error";
import fs from 'fs';

export default function CreateRequestLog(ip: string, path: string, ua: string, timestamp: number) {
    if(!fs.existsSync("./auth/requests.json")) {
        ErrorLog("The file auth/requests.json not found")
        throw Error("The file auth/requests.json not found")
    }

    try {
        process.RequestsMemoryDatabase.push(
            {
                path,
                ip,
                ua,
                timestamp
            }
        )
    } catch (error) {
        ErrorLog("Not good json file " + error)
        throw Error("Not good json file")
    }
}