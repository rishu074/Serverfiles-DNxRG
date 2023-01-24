

export function removeFileFromDb(patz: string) {
    for (let i = 0; i < process.HashDatabase.length; i++) {
        const element = process.HashDatabase[i];
        
        if(element.path === patz) {
            process.HashDatabase.splice(i, 1)
        }
    }
}

export function removeFolderFromDB(patz: string) {
    for (let i = 0; i < process.HashDatabase.length; i++) {
        const element = process.HashDatabase[i];
        
        if(element.path.startsWith(patz)) {
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
    debugger;
    let _directories = patz.split("saved_files")
}