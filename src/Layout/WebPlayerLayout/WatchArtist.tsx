import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography} from "@material-ui/core";
import FetchRequest from "../../utils/FetchRequest";
import Minutes from "../../utils/Minutes";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "9   0px",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#121212",
        display: "flex",
        boxShadow: 'none',
    },
    table: {
        marginTop: 15,
        backgroundColor: "#121212",
        color: "#FFFFFF"
    }
}));

interface ITrack {
    name: string;
    duration_ms: number,
}

export default function WatchArtist(props: any) {
    const classes = useStyles();
    const [artist, setArtist] = useState({
        followers: 0,
        name: '',
        url: '',
    })
    const [tracks, setTracks] = useState([])


    const artistId = props.match.params.artistID
    useEffect(() => {
        async function getArtist() {
            const rsp = await FetchRequest("artists/" + artistId);
            setArtist({
                followers: rsp.followers.total,
                name: rsp.name,
                url: rsp.images[0].url
            })
        }


        async function getArtistTracks() {
            const rsp = await FetchRequest("artists/" + artistId + "/top-tracks?&country=RU");
            setTracks(rsp.tracks)
        }

        getArtist()
        getArtistTracks()
    }, [])

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <img style={{borderRadius: 25}} src={artist.url} alt="playlist logo" height={200}/>
                <CardContent style={{marginTop: 20, color: "#FFFFFF"}}>
                    <Typography gutterBottom variant="h3" component="h2">
                        {artist.name}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Подписчиков: {artist.followers}
                    </Typography>
                </CardContent>
            </Card>
            <TableContainer component={Paper} className={classes.table}>
                <Table style={{borderBottom: '2px solid #121622', width: "90%"}} size="medium"
                       aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{color: "#FFFFFF"}}># НАЗВАНИЕ</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.map((track: ITrack, index) => (
                            <TableRow style={{borderTop: '2px solid #121622'}} key={index}>
                                <TableCell style={{color: "#FFFFFF"}} component="th" scope="row">
                                    {track.name}
                                </TableCell>
                                <TableCell style={{color: "#FFFFFF"}} align="right">
                                    <IconButton style={{color: '#FFFFFF'}}>
                                        <FavoriteBorderIcon/>
                                    </IconButton>
                                    {Minutes(track.duration_ms)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
