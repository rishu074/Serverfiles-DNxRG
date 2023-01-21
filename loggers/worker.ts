import chalk from 'chalk'

export default function WorkerLog(log: string | number) {
    if(process.env.WORKER_LOGS === "true") {
        console.log(
            chalk.blueBright(`[${new Date().toString()}] [WORKER]`, chalk.whiteBright(log))
        )
    }
}