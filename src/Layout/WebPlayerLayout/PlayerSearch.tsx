import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FetchRequest from "../../utils/FetchRequest";
import SearchAlbums from "./SearchAlbums";
import SearchArtists from "./SearchArtists";
import SearchTracks from "./SearchTracks";
import {Link} from "react-router-dom";

import {Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    grid: {
        marginLeft: 5,
        marginTop: 2
    },
    card: {
        borderColor: "#FFFFFF",
        textAlign: "center",
        height: 250,
        backgroundColor: "#262626"
    }
}))

interface ICategory {
    name: string;
    icons: [IIcon];
    id: string;
}

interface IIcon {
    url: string;
}

export default function PlayerSearch(props: {
    result: boolean,
    albums: any | undefined;
    artists: any | undefined;
    tracks: any | undefined;
}) {
    const classes = useStyles()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getCategories() {
            const rsp = await FetchRequest("browse/categories?&limit=16&country=RU&locale=ru_RU");
            setCategories(rsp.categories.items)
        }

        getCategories();
    }, []);

    return (
        <div className={classes.root}>
            {props.result ? [
                <>
                    {props.albums.length > 0 ? (
                        <SearchAlbums albums={props.albums}/>
                    ) : (<></>)}
                    {props.artists.length > 0 ? (
                        <SearchArtists artists={props.artists}/>
                    ) : (<></>)}
                    {props.tracks.length > 0 ? (
                        <SearchTracks tracks={props.tracks}/>
                    ) : (<></>)}
                </>
            ] : (
                <>
                    <Typography variant="h6">
                        Все остальное
                    </Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        {categories.map((categories: ICategory, index) => (
                            <Grid item xs={9} md={2} sm={6}>
                                <Link to={"/player/genre/" + categories.id} style={{textDecoration: 'none'}}>
                                    <Card key={index} className={classes.card}>
                                        <CardMedia title="Album image">
                                            <img src={categories.icons[0].url} alt="album logo" height={130}
                                                 width={"100%"}/>
                                        </CardMedia>
                                        <CardContent>
                                            <Typography variant="subtitle1" style={{color: "#FFFFFF"}} component="p">
                                                {categories.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}
