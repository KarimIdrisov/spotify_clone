import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography}
    from "@material-ui/core";
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
}

export default function FavoritesTracks(props: any) {
    const classes = useStyles();
    const [tracks, setTracks] = useState([])


    useEffect(() => {
        async function getTracks() {
            const rsp = await FetchRequest("me/tracks");
            setTracks(rsp.items)
        }

        getTracks()
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent style={{marginTop: 20, color: "#FFFFFF"}}>
                        <Typography gutterBottom variant="h3" component="h2">
                            Любимые треки
                        </Typography>
                    </CardContent>
                </Card>
                <TableContainer component={Paper} className={classes.table}>
                    <Table style={{borderBottom: '2px solid #121622', width: "90%"}} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{color: "#FFFFFF"}}># НАЗВАНИЕ</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tracks.map((track: IItem, index) => (
                                <TableRow style={{borderTop: '2px solid #121622'}}  key={index}>
                                    <TableCell style={{color: "#FFFFFF"}} component="th" scope="row">
                                        {track.track.name}
                                    </TableCell>
                                    <TableCell style={{color: "#FFFFFF"}} align="right">
                                        {Minutes(track.track.duration_ms)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
};
