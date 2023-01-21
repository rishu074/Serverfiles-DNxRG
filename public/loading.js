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


async function Process() {
    try {
        var res = await axios(
            {
                url: window.location.pathname,
                headers: {
                    "xsrf": window.localStorage.getItem("xsrf")
                }
            }
        )
        let resDataToShow = await res.data

        document.open()
        document.write(resDataToShow)
        document.close()

        window.stop()
        clearInterval(loadingAnimator)
    } catch (error) {
        if(error?.response?.status === 401) {
            let login = await getloginpage()

            document.open()
            document.write(login)
            document.close()

            window.stop()
        } else {
            document.open()
            document.write(error)
            document.close()
        }
        clearInterval(loadingAnimator)
    }
}

Process()

