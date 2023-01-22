// the function to parse the inner html
function ParseInnerHtml(isDir, name, size, last_modified) {
    return `<td>
    <div class="d-flex px-2 py-1">
        <div class="px-2">
            <i class="${isDir ? "fa fa-folder" : "fa fa-file"}" aria-hidden="true"></i>
        </div>
        <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">${name}</h6>
        </div>
    </div>
</td>
<td>
    <p class="text-xs font-weight-bold mb-0">${isDir ? '' : size}</p>
</td>
<td class="align-middle text-center text-sm">
    <!-- <span class="badge badge-sm bg-gradient-success">Online</span> -->
    <p class="text-xs font-weight-bold mb-0">${last_modified}</p>
</td>
<td class="align-middle text-center">
    <!-- <span class="text-secondary text-xs font-weight-bold">23/04/18</span> -->
    <div class="btn-group position-static">
        <button type="button" class="btn dropdown-toggle"
            data-bs-toggle="dropdown" data-boundary="window" data-bs-display="static"
            aria-expanded="false">
            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end">
            <li><button class="dropdown-item text-danger" type="button"><i class="fa fa-trash-o" aria-hidden="true"></i>
                Delete</button>
            </li>
        </ul>
    </div>
</td>`
}

var state = {
    nextLink: "",
    currentPath: "",
    api_url: "/api/list",
    download_url: "/file"
}
let table_body = document.getElementById("table-body")
var back_button = document.getElementById("back-btn")


async function loadFiles() {
    let files = await axios.get(state.nextLink, {
        headers: {
            "xsrf": window.localStorage.getItem("xsrf")
        }
    })

    files = await files.data

    // we have the array of files

    // clear the table
    table_body.innerHTML = ""
    if(state.currentPath === "/") {
        back_button.hidden = true
    } else {
        back_button.hidden = false
    }

    // loop through files and create tr's
    for (let i = 0; i < files.length; i++) {
        const element = files[i];
        
        let _tr = document.createElement("tr")
        _tr.style.cursor = "pointer"

        _tr.innerHTML = ParseInnerHtml(element.isDir, element.name, element.size, element.last_modified)
        table_body.appendChild(_tr)

        // add click listeners
        _tr.addEventListener("click", async () => {
            if(element.isDir) {
                state.currentPath = state.currentPath + element.name + "/"
                state.nextLink = state.nextLink + element.name + "/"
                loadFiles()
                return
            } else {
                let _new_link = state.download_url + state.currentPath + element.name
                let _temp_a = document.createElement("a")
                _temp_a.target = "_blank"
                _temp_a.href = _new_link
                _temp_a.click()
                return
            }
        })
    }

}

// parse the current paths
let _temp = window.location.pathname.split("files")
_temp.shift()
_temp = _temp.join("")

if(!_temp.endsWith("/")) {
    _temp = _temp + "/"
}

state.currentPath = _temp
state.nextLink = state.api_url + _temp
loadFiles()

// parse back button
back_button.addEventListener("click", () => {
    let _next_path = state.currentPath.split("/")
    _next_path.splice(_next_path.length - 2, 2)
    _next_path = _next_path.join("/")

    if(_next_path.trim() === "") {
        _next_path = "/"
    }
    if(!_next_path.endsWith("/")) {
        _next_path = _next_path + "/"
    }

    //update the state
    state.currentPath = _next_path
    state.nextLink = state.api_url + _next_path
    loadFiles()
})