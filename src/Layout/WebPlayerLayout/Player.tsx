import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

import {Box, Card, CardContent, CardMedia, IconButton, Slider, Typography} from "@material-ui/core";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import QueueIcon from '@material-ui/icons/Queue';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {VolumeDown} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        zIndex: 9999,
    },
    footer: {
        display: "flex",
        zIndex: 9999,
        background: "#282828",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100px",
    },
    container: {
        background: "#282828",
        display: "flex",
        boxShadow: "none",
    },
    player: {
        boxShadow: "none",
        background: "#282828",
        display: "block",
        width: "250px",
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 50,
        paddingLeft: "120px",
        justifyContent: "center",
        textAlign: "center"
    },
    player_end: {
        boxShadow: "none",
        background: "#282828",
        display: "block",
        marginTop: 30,
        marginBottom: 5,
        marginLeft: 300,
        paddingRight: 18
    },
    hide: {
        display: "none",
    }
}));

export default function Player(props: {
    lastTrack: any | undefined;
}) {
    const classes = useStyles();
    const [play, setPlay] = useState(false)
    const handlePlay = () => {
        setPlay(!play)
    }
    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Card className={classes.container}>
                    <CardMedia
                        style={{marginTop: 15, marginLeft: 8, borderRadius: 20}}
                        title="track photo">
                        <img alt="track logo" src={props.lastTrack.url}/>
                    </CardMedia>
                    <CardContent>
                        <Typography style={{color: "#FFFFFF", fontSize: 15}} component="h5" variant="h6">
                            {props.lastTrack.name}
                        </Typography>
                        <Typography style={{color: "#b3b3b3"}} variant="subtitle1" color="textSecondary">
                            {props.lastTrack.author}
                        </Typography>
                    </CardContent>
                    <Box style={{marginTop: 20}}>
                        <IconButton>
                            <FavoriteIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                    </Box>
                </Card>

                <Card className={classes.player} style={{marginLeft: 210, marginRight: 50,}}>
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <IconButton>
                            <ShuffleIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                        <IconButton>
                            <SkipPreviousIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                        <IconButton onClick={handlePlay}>
                            <PlayCircleOutlineIcon style={{color: "#FFFFFF"}} className={clsx({
                                [classes.hide]: play
                            })}/>
                            <PauseCircleOutlineIcon style={{color: "#FFFFFF"}} className={clsx({
                                [classes.hide]: !play
                            })}/>
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                        <IconButton>
                            <RepeatIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                    </Box>
                </Card>
                <Card className={classes.player_end}>
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <IconButton>
                            <QueueIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                        <IconButton>
                            <VolumeDown style={{color: "#FFFFFF"}}/>
                        </IconButton>
                        <Slider
                            style={{color: "#FFFFFF", width: 90, marginTop: 11}}
                            track={false}
                            aria-labelledby="track-false-slider"
                            defaultValue={0}
                        />
                        <IconButton>
                            <VolumeUpIcon style={{color: "#FFFFFF"}}/>
                        </IconButton>
                    </Box>
                </Card>
            </footer>
        </div>
    )
}