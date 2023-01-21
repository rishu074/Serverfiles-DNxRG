import ErrorLog from "../loggers/error"
import WorkerLog from "../loggers/worker"
import fs from 'fs'
import random from '../utils/randomString'

export default function ChangeSessionKeys() {
    try {
        var json_file = JSON.parse(fs.readFileSync("./auth/session.json", {encoding: "utf-8"}))
    } catch (error) {
        ErrorLog("Json file not good")
        throw Error("The json file is not good")
    }

    let new_session_key = random(16)
    let new_xsrf = random(16)

    json_file.session_key = new_session_key
    json_file.xsrf_token = new_xsrf

    process.SessionKeys.session_key = new_session_key
    process.SessionKeys.xsrf_token = new_xsrf
    fs.writeFileSync("./auth/session.json", JSON.stringify(json_file, null, 2), {encoding: "utf-8"})

    WorkerLog("ChangeSessionKeys run")
}