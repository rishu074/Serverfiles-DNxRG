import chalk from 'chalk'

export default function InfoLog(log: string | number) {
    console.log(
        chalk.blueBright(`[${new Date().toString()}] [INFO]`, chalk.whiteBright(log))
    )
}