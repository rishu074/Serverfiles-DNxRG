import chalk from 'chalk'

export default function InfoLog(log: string | number) {
    console.log(
        chalk.blueBright(`[${Date.now().toLocaleString()}] [INFO]`, chalk.whiteBright(log))
    )
}