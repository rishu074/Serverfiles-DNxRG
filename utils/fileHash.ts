import fs from 'fs'
import crypto from 'crypto'

export default async function getFileHash(path: string, hash: crypto.Hash): Promise<void> {
    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(path)

        let l1 = stream.on('readable', () => {
            const data = stream.read()
            if(data != null) {
                hash.update(data)
            }
        })
        let l2 = stream.on('end', () => {
            stream.removeAllListeners("readable")
            stream.removeAllListeners("end")
            resolve()
        })
    })

}