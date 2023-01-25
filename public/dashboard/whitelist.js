var state = {
    get_whitelist: {
        url: "api/whitelist",
        headers: {
            'xsrf': window.localStorage.getItem("xsrf")
        }
    },
    table_body: document.getElementById("table-body"),
    prepare_delete_request: (ip) => {
        return {
            url: "api/whitelist?t="+ip,
            headers: {
                'xsrf': window.localStorage.getItem("xsrf")
            },
            method: "DELETE"
        }
    },
    prepare_create_request: (ip) => {
        return {
            url: "api/whitelist?t="+ip,
            headers: {
                'xsrf': window.localStorage.getItem("xsrf")
            },
            method: "POST"
        }
    }
}

function loading(boo) {
    if(boo) {
        state.table_body.innerHTML = ""
        document.getElementById("no-files").style.display = "none"
        document.getElementById("loader-a").style.display = "flex"
    } else {
        document.getElementById("loader-a").style.display = "none"
    }
}

function ParseInnerHtml(ip) {
    return `<td>
    <h6 class="mb-0 text-sm">${ip}</h6>
</td>
<td class="align-middle text-center">
    <button type="button" class="btn" id="delete-btn"><i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
</td>`
}

async function loadWhitelist() {
    loading(true)
    let res = await axios(state.get_whitelist)
    loading(false)

    let whitelist_data = await res.data
    if(whitelist_data.length === 0) {
        return document.getElementById("no-files").style.display = "flex"
    }

    for (let i = 0; i < whitelist_data.length; i++) {
        const element = whitelist_data[i];

        let _tr = document.createElement("tr")

        _tr.innerHTML = ParseInnerHtml(element)
        state.table_body.appendChild(_tr)

        let _tr_button = _tr.querySelector("td > button#delete-btn")
        _tr_button.addEventListener("click", async () => {
            await axios(state["prepare_delete_request"](element))
            loadWhitelist()
        })
    }
}

loadWhitelist()

var create_btn = document.getElementById("create-btn-main")
create_btn.addEventListener("click", async () => {
    let ip = document.getElementById("folder-name-create").value;

    await axios(state["prepare_create_request"](ip))
    loadWhitelist()
})
