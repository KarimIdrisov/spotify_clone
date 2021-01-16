import React, {useEffect, useState} from "react"
import Player from "./Player";
import FetchRequest from "../../utils/FetchRequest";

export default function PlayerControl() {
    const [lastTrack, setLastTrack] = useState({
        author: '',
        name: '',
        duration_ms: 0,
        url: ''
    })

    useEffect(() => {
        async function getLastTrack() {
            const rsp = await FetchRequest("me/player/recently-played?&limit=1&country=RU&locale=ru_RU")
            setLastTrack({
                author: rsp.items[0].track.artists[0].name,
                name: rsp.items[0].track.name,
                duration_ms: rsp.items[0].track.duration_ms,
                url: rsp.items[0].track.album.images[2].url
            })
        }
        getLastTrack();
    }, []);
    return (
        <Player lastTrack={lastTrack}/>
    )
}