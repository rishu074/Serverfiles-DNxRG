import fs from 'fs'
import crypto from 'crypto'
import getFileHash from './fileHash';

export default async function getDirChecksum(path: string, hash: crypto.Hash) {
    let stat = fs.readdirSync(path)

    for (let i = 0; i < stat.length; i++) {
        const element = stat[i];
        let s = fs.lstatSync(path + "/" + element)

        if(s.isDirectory()) {
            await getDirChecksum(path + "/" + element, hash)
        } else {
            await getFileHash(path + "/" + element, hash)
        }
    }

    return hash
}