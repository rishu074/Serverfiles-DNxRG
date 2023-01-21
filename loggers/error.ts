import chalk from 'chalk'

export default function ErrorLog(log: string | number) {
    console.log(
        chalk.redBright(`[${new Date().toString()}] [ERROR]`, chalk.whiteBright(log))
    )
}