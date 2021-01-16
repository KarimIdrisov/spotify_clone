import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FetchRequest from "../../utils/FetchRequest";

import {Card, CardContent, CardMedia, Grid, ListItem, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    card: {
        borderColor: "#FFFFFF",
        textAlign: "center",
        height: 250,
        backgroundColor: "#262626"
    }

}))

interface IPlaylist {
    description: string;
    name: string;
    images: [IImages];
    owner: IOwner;
    id: string;
}

interface IImages {
    url: string;
}

interface IOwner {
    display_name: string;
}

export default function CategoriesCards(props: {
    category: any | undefined;
    index: any | undefined;
}) {
    const classes = useStyles()
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        async function getPlaylists() {
            const rsp = await FetchRequest('browse/categories/' + props.category + '/playlists?&limit=6&country=RU&locale=ru_RU');
            setPlaylists(rsp.playlists.items)
        }

        getPlaylists();
    }, []);

    return (
        <ListItem key={props.index}>
            <Grid container spacing={2}>
                {playlists.map((playlist: IPlaylist, index) => (
                    <Grid key={index} item xs={9} md={2} sm={6}>
                        <Link to={"/player/playlist/" + playlist.id} style={{textDecoration: 'none'}}>
                            <Card className={classes.card}>
                                <CardMedia title="Album image">
                                    <img src={playlist.images[0].url} alt="album logo" height={120} width={"100%"}/>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="subtitle2" style={{color: "#FFFFFF"}} component="p">
                                        {playlist.name}
                                    </Typography>
                                    <Typography variant="subtitle2" style={{color: "#FFFFFF"}} component="p">
                                        Автор: {playlist.owner.display_name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </ListItem>
    )
}
