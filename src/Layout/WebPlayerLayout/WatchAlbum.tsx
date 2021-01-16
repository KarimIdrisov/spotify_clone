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

export default function WatchAlbum(props: any) {
    const classes = useStyles();
    const [playlist, setPlaylist] = useState({
        url: '',
        name: '',
        owner: '',
    })
    const [tracks, setTracks] = useState([])


    const albumId = props.match.params.albumID
    useEffect(() => {
        async function getAlbumDate() {
            const rsp = await FetchRequest("albums/" + albumId);
            setPlaylist({
                url: rsp.images[0].url,
                name: rsp.name,
                owner: rsp.artists[0].name
            })
        }

        async function getAlbumTracks() {
            const rsp = await FetchRequest("albums/" + albumId + "/tracks?&limit=20");
            setTracks(rsp.items)
        }

        getAlbumDate()
        getAlbumTracks()
    }, [])

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
