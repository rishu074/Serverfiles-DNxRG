import fs from 'fs'
import dotenv from 'dotenv'

var commandsAndTheirFunctions = {
    "quit": async () => {
        process.exit(0)
    },
    "/whitelist": async (cmd: string, ...arg: any[]) => {
        if(cmd === "reload") {
            let whitelistedIPS = JSON.parse(fs.readFileSync('./auth/ips_whitelist.json', {encoding:"utf-8"}))
            process.WhitelistedIPS = whitelistedIPS
            console.log("\nReloaded whitelist with " + whitelistedIPS + " \n")
        } else if (cmd === "help") {
            console.log("\navailable commands: \"reload: Reloads whitelist in application\", \"add <ip>: Adds the ip in whitelist\", \"remove <ip>: Removes an ip from whitelist\"\n")
        } else if (cmd === "add") {
            if(typeof arg[0] != "string") {
                return console.log("\n No ip provided to add \n")
            }

            let whitelistedIPS = JSON.parse(fs.readFileSync('./auth/ips_whitelist.json', {encoding:"utf-8"}))
            whitelistedIPS.push(arg[0])
            fs.writeFileSync('./auth/ips_whitelist.json', JSON.stringify(whitelistedIPS, null, 2), {encoding: "utf-8"})
            console.log("\n Added " + arg[0] + " to whitelist.\n")
        } else if (cmd==="remove") {
            if(typeof arg[0] != "string") {
                return console.log("\n No ip provided to add \n")
            }

            let whitelistedIPS = JSON.parse(fs.readFileSync('./auth/ips_whitelist.json', {encoding:"utf-8"}))
            if(whitelistedIPS.indexOf(arg[0]) === -1) return console.log("\n No " + arg[0] + " found in whitelist.\n")
            whitelistedIPS.splice(whitelistedIPS.indexOf(arg[0]), 1)
            fs.writeFileSync('./auth/ips_whitelist.json', JSON.stringify(whitelistedIPS, null, 2), {encoding: "utf-8"})
            console.log("\n Removed " + arg[0] + " from whitelist.\n")
        }
    },
    "/env": async (cmd: string) => {
        if(cmd === "reload") {
            dotenv.config()
            console.log("\nReloaded env vars.\n")
        } else if (cmd === "help") {
            console.log("\navailable commands: \"reload\"\n")
        }
    }
}

export default async function ListenToCommands(cb: Function) {
    process.stdin.on('data', async (data) => {
        let data_input = data.toString().trim().toLocaleLowerCase()
        let command = data_input.split(" ")[0]
        let args = data_input.split(" ")
        args.shift()

        if(!commandsAndTheirFunctions[command]) return console.log(`\nNo commands found with "${command} ${args.join(" ")}", here are the list of commands \n${Object.keys(commandsAndTheirFunctions).join(" , ")} \n`)

        return commandsAndTheirFunctions[command](...args)

    })
}