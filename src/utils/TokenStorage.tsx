export default function parseToken() {
    let token = localStorage.getItem('token')
    token = window.location.href.slice(window.location.href.indexOf("=") + 1, window.location.href.length)
    localStorage.setItem("token", token)
    return token
}   