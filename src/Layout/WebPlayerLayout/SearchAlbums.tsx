import React from 'react'
import {Card, CardContent, CardMedia, Grid, List, ListItem, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";


interface IPlaylist {
    description: string;
    name: string;
    images: [IImages, IImages, IImages];
    owner: IOwner;
    id: string;
}

interface IImages {
    url: string;
}

interface IOwner {
    display_name: string;
}

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

export default function SearchAlbums(props: {
    albums: [];
}) {
    const classes = useStyles();

    return (
        <List component="nav" aria-label="secondary mailbox folders">
            <Typography variant="h6">
                Альбомы
            </Typography>
            <ListItem>
                <Grid container spacing={2}>
                    {props.albums.map((playlist: IPlaylist, index) => (
                        <Grid key={index} item xs={9} md={2} sm={6}>
                            <Link to={"/player/album/" + playlist.id} style={{textDecoration: 'none'}}>
                                <Card className={classes.card}>
                                    <CardMedia title="Album image">
                                        <img src={playlist.images[0].url} alt="album logo" height={130}
                                             width={"100%"}/>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant="subtitle1" style={{color: "#FFFFFF"}} component="p">
                                            {playlist.name}
                                        </Typography>
                                        <Typography variant="subtitle2" style={{color: "#FFFFFF"}} component="p">
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </ListItem>
        </List>
    )
}