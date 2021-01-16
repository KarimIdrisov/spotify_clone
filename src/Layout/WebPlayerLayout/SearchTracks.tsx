import React from 'react'
import {Card, CardContent, CardMedia, Grid, List, ListItem, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


interface ITrack {
    description: string;
    name: string;
    album: IImages;
}
interface IImages {
    images: [IUrl];
}
interface IUrl {
    url: string;
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

export default function SearchTracks(props: {
    tracks: [];
}) {
    const classes = useStyles();
    return (
        <List component="nav" aria-label="secondary mailbox folders">
            <Typography variant="h6">
                Треки
            </Typography>
            <ListItem>
                <Grid container spacing={2}>
                    {props.tracks.map((track: ITrack, index) => (
                        <Grid key={index} item xs={9} md={2} sm={6}>
                            <Card className={classes.card}>
                                <CardMedia title="Album image">
                                    <img src={track.album.images[0].url}  alt="album logo" height={130}
                                         width={"100%"}/>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="subtitle1" style={{color: "#FFFFFF"}}  component="p">
                                        {track.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </ListItem>
        </List>
    )
}