import RequestsHandlerWorker from "./RequestsHandler";
import RequestsLogPretty from "./RequestsLogPretty";
import ChangeSessionKeys from "./ChangeSessionKeys";
import DownloadsSaverWorker from "./DownloadsSaver";

export default function StartWorkers(cb: Function) {
    setInterval(() => {
        RequestsHandlerWorker()
        RequestsLogPretty()
    }, 1000)


    setInterval(() => {
        DownloadsSaverWorker()
    }, 5000)

    setInterval(() => {
        ChangeSessionKeys()
    }, 10 * 60 * 1000)
    cb()
}