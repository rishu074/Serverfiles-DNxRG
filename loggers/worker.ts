import chalk from 'chalk'

export default function WorkerLog(log: string | number) {
    console.log(
        chalk.blueBright(`[${new Date().toString()}] [WORKER]`, chalk.whiteBright(log))
    )
}