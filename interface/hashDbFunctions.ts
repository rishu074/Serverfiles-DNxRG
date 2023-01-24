import path from "path";


export function removeFileFromDb(patz: string) {
    for (let i = 0; i < process.HashDatabase.length; i++) {
        const element = process.HashDatabase[i];
        
        if(element.path === patz) {
            process.HashDatabase.splice(i, 1)
        }
    }
}

export function removeFolderFromDB(patz: string) {
    // console.log(patz, process.HashDatabase)
    for (let i = 0; i < process.HashDatabase.length; i++) {
        const element = process.HashDatabase[i];
        
        if(element.path.startsWith(patz) || element.path === patz) {
            process.HashDatabase.splice(i, 1)
        }
    }
}

export function LoadInDatabase(patz: string, hash: string, isDir: boolean) {
    for (let i = 0; i < process.HashDatabase.length; i++) {
        const element = process.HashDatabase[i];
        
        if(element.path === patz) {
            process.HashDatabase.splice(i, 1)
        }
    }

    process.HashDatabase.push({
        isDir,
        path: patz,
        hash
    })
}

export function getFromDatabase(patz: string) {
    for (let i = 0; i < process.HashDatabase.length; i++) {
        const element = process.HashDatabase[i];
        
        if(element.path === patz) {
            return element
        }
    }

    return undefined
}

export function HandleNestedHashRemove(patz: string) {
    let _directories = patz.split("saved_files")[1].split("/")[1];

    removeFolderFromDB(path.join(process.cwd(), "saved_files", _directories))
}