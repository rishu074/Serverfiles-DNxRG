var state = {
    table_body: document.getElementById("table-body"),
    get_logs: {
        url: "/requests",
        headers: {
            'xsrf': window.localStorage.getItem("xsrf")
        }
    },
    get_ip: {
        url: "/ip",
        headers: {
            'xsrf': window.localStorage.getItem("xsrf")
        }
    }
}



function loading(boo) {
    if(boo) {
        // state.table_body.innerHTML = ""
        document.getElementById("no-files").style.display = "none"
        document.getElementById("loader-a").style.display = "flex"
    } else {
        document.getElementById("loader-a").style.display = "none"
    }
}

function ParseInnerHtml(path, ip, ua, time) {
    return `<td class="align-middle text-center">
    <h6 class="mb-0 text-sm">${path}</h6>
</td>
<td class="align-middle text-center">
    <p>${ip}</p>
</td>
<td class="align-middle text-center">
    <p>${ua}</p>
</td>
<td class="align-middle text-center">
    <p>${time}</p>
</td>`
}

async function get_ip() {
    try {
        let res = await axios(state.get_ip)
        state["ip"] = await res.data
        
    } catch (error) {
        return window.location.replace("/" + error)
    }
}

async function loadLogs() {
    loading(true)
    await get_ip()
    let res = await axios(state.get_logs)
    loading(false)
    let fetched_logs = await res.data['requests'].reverse();

    if(fetched_logs.length === 0) {
        return document.getElementById("no-files").style.display = "flex"
    }

    for (let i = 0; i < fetched_logs.length; i++) {
        const element = fetched_logs[i];

        let _tr = document.createElement("tr")

        _tr.innerHTML = ParseInnerHtml(element.path, element.ip, element.ua, new Date(element.timestamp).toTimeString())
        state.table_body.appendChild(_tr)
        
    }
}

async function IntervelLoadLogs() {
    let res = await axios(state.get_logs)

    let fetched_logs = await res.data['requests'].reverse();
    if(state.table_body.childNodes.length > 60) {
        state.table_body.innerHTML = ""
    }

    if(fetched_logs.length === 0) {
        return document.getElementById("no-files").style.display = "flex"
    }

    let real_logs = []

    for (let i = 0; i < fetched_logs.length; i++) {
        const element = fetched_logs[i];
        
        if(element.ip != state.ip) {
            real_logs.push(element)
        }
    }

    
    for (let i = 0; i < real_logs.length; i++) {
        const element = real_logs[i];

        let _tr = document.createElement("tr")

        _tr.innerHTML = ParseInnerHtml(element.path, element.ip, element.ua, new Date(element.timestamp).toTimeString())
        state.table_body.prepend(_tr)
        
    } 
}

setInterval(async () => {
    await IntervelLoadLogs()
}, 1000);



loadLogs()
