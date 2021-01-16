import parseToken from "./TokenStorage";

export default function RefreshToken() {
    let current = ''
    if (window.location.href.includes("player")) {
        current = "http://localhost:3000/player/"
    } else {
        current = "http://localhost:3000/"
    }

    window.location.href = 'https://accounts.spotify.com/authorize?client_id=25ea82ddd98f4bf9bb3f9c9db8db37a2&redirect_uri=' + current + '&scope=user-follow-read%20user-read-recently-played%20user-read-currently-playing%20user-modify-playback-state%20playlist-read-collaborative%20streaming%20user-library-read%20user-read-private%20user-read-email&response_type=token&show_dialog=true';
    parseToken();
}