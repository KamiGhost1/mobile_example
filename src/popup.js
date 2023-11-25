import {initApp} from './ui/index'
import { LocalStorage } from './ui/Utils'

const androidRegex = /Android/
const iosRegex = /ios/
const linuxRegex = /Linux/

async function setupUI() {
    initApp()
}

document.addEventListener('DOMContentLoaded', () => {
    setupUI().then()
})

// TODO Description
function getUrlVars() {
    let params = []
    let str
    let url = window.location.search.substr(1)
    url = url.split('&')
    for (let i in url) {
        str = url[i].split('=')
        params[str[0]] = str[1]
    }
    return params
}

const checkDevice = ()=>{
    if (androidRegex.test(navigator.platform) || iosRegex.test(navigator.platform) || linuxRegex.test(navigator.platform)){
        return true
    }

    return false
}

global.checkDevice = checkDevice
global.getUrlVars = getUrlVars
global.LocalStorage = LocalStorage 