import RefreshToken from "./RefreshToken";

async function FetchRequest(url: string) {
    const request = new Request(`${"https://api.spotify.com/v1/" + url}`,
        {
            headers: new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
        });
    try {
        const resFetch = await fetch(request);
        const resJson = await resFetch.json();
        if (resJson.error && resJson.error.status === 401) {
            RefreshToken();
        }
        return resJson;
    } catch (err) {
        console.log(err);
    }
}

export default FetchRequest;