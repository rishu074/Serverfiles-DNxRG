var loadingAnimator
var loadingComponent = document.getElementById('loading-text')
var state = {
    loadingText: "Loading"
}

function Loadapp() {
    let animations = [".", "..", "...", "..."]
    let i = 0
    loadingAnimator = setInterval(() => {
        loadingComponent.innerText = state.loadingText +  animations[i]
        if(i != animations.length - 1) {
            i++
        } else {
            i = 0
        }
    }, 400);
}

Loadapp()

async function getloginpage() {
    try {
        var res = await axios.get("/login")
    } catch (error) {
        document.write(error)
    }

    return await res.data
}

// start actually loading the page
console.log(window.location)
async function Process() {
    try {
        var res = await axios.get(window.location.pathname)
    } catch (error) {
        if(error?.response?.status === 401) {
            console.log("Loading login page")
            let login = await getloginpage()
            document.write(login)
        } else {
            document.write(error)
        }
    }
}

Process()

