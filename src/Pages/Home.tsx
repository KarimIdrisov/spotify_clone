import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MainContent from "../Layout/HomeLayout/MainContent";
import Layout from "../Layout/Layout";
import FetchRequest from "../utils/FetchRequest";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

export default function Home() {
    const classes = useStyles();

    const [isLogin, setLogin] = useState(false)
    const token = localStorage.getItem("token")
    if (token && !isLogin) {
        setLogin(true)
    }
    const [albums, setAlbums] = useState()

    useEffect(() => {
        async function getAlbums() {
            const rsp = await FetchRequest("browse/featured-playlists?&limit=6&country=RU&locale=ru_RU");
            setAlbums(rsp.playlists.items);
        }
        if (isLogin) {
            getAlbums();
        }
    }, []);

    return (
        <div className={classes.root}>
            <Layout parent="home" updateData={undefined} input={undefined}>
                <MainContent login={isLogin} albums={albums}/>
            </Layout>
        </div>
    );
}