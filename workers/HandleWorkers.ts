import RequestsHandlerWorker from "./RequestsHandler";
import RequestsLogPretty from "./RequestsLogPretty";

export default function StartWorkers(cb: Function) {
    cb()
    setInterval(() => {
        RequestsHandlerWorker()
        RequestsLogPretty()
    }, 5000)
}