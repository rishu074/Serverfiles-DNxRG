import RequestsHandlerWorker from "./RequestsHandler";

export default function StartWorkers(cb: Function) {
    cb()
    setInterval(() => {
        RequestsHandlerWorker()
    }, 5000)
}