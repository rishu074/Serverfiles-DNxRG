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

// start actually loading the page
console.log(window.location)
