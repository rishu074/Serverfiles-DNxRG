import chalk from 'chalk'

export default function WarnLog(log: string | number) {
    console.log(
        chalk.yellowBright(`[${new Date().toString()}] [WARN]`, chalk.whiteBright(log))
    )
}