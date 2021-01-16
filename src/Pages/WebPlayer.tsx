import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Layout from "../Layout/Layout";
import PlayerMain from "../Layout/WebPlayerLayout/PlayerMain";
import FetchRequest from "../utils/FetchRequest";
import {Route, Switch} from "react-router-dom";
import PlayerLibrary from "../Layout/WebPlayerLayout/PlayerLibrary";
import PlayerSearch from "../Layout/WebPlayerLayout/PlayerSearch";
import PlayerLibraryPlaylists from "../Layout/WebPlayerLayout/PlayerLibraryPlaylists";
import WatchAlbum from "../Layout/WebPlayerLayout/WatchAlbum";
import WatchCategory from "../Layout/WebPlayerLayout/WatchCategory";
import WatchArtist from "../Layout/WebPlayerLayout/WatchArtist";
import WatchPlaylist from "../Layout/WebPlayerLayout/WatchPlaylist";
import FavoritesTracks from "../Layout/WebPlayerLayout/FavoritesTracks";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "60px",
        marginLeft: "232px",
        flexGrow: 1,
        background: "#121212",
        color: "#FFFFFF",
        padding: 20,
        marginBottom: "100px"
    },
}))


export default function WebPlayer() {
    const classes = useStyles()

    const [categories, setCategories] = useState([])
    const [searchResult, setSearchResult] = useState({
        isResult: false,
        albums: [],
        artists: [],
        tracks: [],
    })
    const [searchTerm, setSearchTerm] = React.useState("");
    const updateData = (value: React.SetStateAction<string>) => {
        setSearchTerm(value)
    }

    const [isLogin, setLogin] = useState(false)
    const token = localStorage.getItem("token")
    if(token !== '' && !isLogin) {
        setLogin(true)
    }
    if (token === '' && isLogin) {
        setLogin(false)
    }

    useEffect(() => {
        async function getCategories() {
            const rsp = await FetchRequest("browse/categories?&limit=6&country=RU&locale=ru_RU");
            setCategories(rsp.categories.items)
        }

        async function getSearchResults() {
            const rsp = await FetchRequest("search?&q=" + searchTerm + "&type=album,track,artist,playlist&limit=5")
            setSearchResult({
                isResult: true,
                albums: rsp.albums.items,
                artists: rsp.artists.items,
                tracks: rsp.tracks.items,
            })
        }
        if(searchTerm.length > 0) {
            getSearchResults();
        } else {
            setSearchResult({albums: [], artists: [], tracks: [], isResult: false})
        }
        getCategories();
    }, [searchTerm]);

    return (
        <div className={classes.root}>
            <Layout parent="player" updateData={updateData} input={searchTerm} >
                <Switch>
                    <Route path="/player/favorites-tracks" component={FavoritesTracks}/>
                    <Route path="/player/playlist/:playlistID" component={WatchPlaylist}/>
                    <Route path="/player/artist/:artistID" component={WatchArtist}/>
                    <Route path="/player/genre/:categoryID" component={WatchCategory}/>
                    <Route path="/player/album/:albumID" component={WatchAlbum}/>
                    <Route path="/player/library/playlists" component={PlayerLibraryPlaylists}/>
                    <Route path="/player/library" component={PlayerLibrary}/>
                    <Route path="/player/search"
                           render={(props) => <PlayerSearch
                               result={searchResult.isResult}
                               albums={searchResult.albums}
                               artists={searchResult.artists}
                               tracks={searchResult.tracks}
                           />}/>
                    <Route path="/player"
                           render={(props) => <PlayerMain categories={categories}/>}/>
                </Switch>
            </Layout>
        </div>
    )

}
