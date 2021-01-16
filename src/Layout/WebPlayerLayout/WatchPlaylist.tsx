import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FetchRequest from "../../utils/FetchRequest";
import Minutes from "../../utils/Minutes";

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

interface IItem {
    track: ITrack
}

interface ITrack {
    name: string;
    duration_ms: number,
    id: string,
}

export default function WatchPlaylist() {
    const classes = useStyles();
    const [playlist, setPlaylist] = useState({
        url: '',
        name: '',
        owner: '',
    })
    const [tracks, setTracks] = useState([])

    const playlistId = props.match.params.playlistID
    useEffect(() => {
        async function getPlaylistDate() {
            const rsp = await FetchRequest("playlists/" + playlistId);
            setPlaylist({
                url: rsp.images[0].url,
                name: rsp.name,
                owner: rsp.owner.display_name
            })
        }

        async function getAlbumTracks() {
            const rsp = await FetchRequest("playlists/" + playlistId + "/tracks?&limit=15");
            setTracks(rsp.items.filter(isNotNull))
        }

        getPlaylistDate()
        getAlbumTracks()
    }, [])

    function isNotNull(value: IItem) {
        return value.track != null;
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <img style={{borderRadius: 25}} src={playlist.url} alt="playlist logo" height={200}/>
                <CardContent style={{marginTop: 20, color: "#FFFFFF"}}>
                    <Typography gutterBottom variant="h3" component="h2">
                        {playlist.name}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {playlist.owner}
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
                        {tracks.map((track: IItem, index) => (
                            <TableRow key={index} style={{borderTop: '2px solid #121622'}}>
                                <TableCell style={{color: "#FFFFFF"}} component="th" scope="row">
                                    {track.track.name}
                                </TableCell>
                                <TableCell style={{color: "#FFFFFF"}} align="right">
                                    <IconButton style={{color: '#FFFFFF'}}>
                                        <FavoriteBorderIcon/>
                                    </IconButton>
                                    {Minutes(track.track.duration_ms)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
