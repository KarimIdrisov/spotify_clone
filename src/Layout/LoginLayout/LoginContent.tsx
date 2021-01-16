import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Link} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "@fontsource/roboto"
import {Box, Button, Typography} from "@material-ui/core";
import parseToken from "../../utils/TokenStorage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#fafafa",
        height: 800,
    },
    navbar: {
        justifyContent: "center",
        background: "#FFFFFF",
        height: "110px",
    },
    login: {
        justifyContent: "center",
    },
    container: {
        marginTop: "9%",
        textAlign: "center",
        width: 400,
        margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
        margin: 'auto',
        width: "70%",
        marginBottom : 10,
        display: "block",
        borderRadius: 30,
        background: "#1ED760",
    },
    header: {
        textAlign: 'center',
        background: '#212121',
        color: '#fff'
    },
    hide: {
        display: "none",
    },
    text: {
        fontSize: 30,
    },
    logo: {
        paddingTop: 10,
        marginRight: 3
    },
    link: {
        textDecoration: "none"
    }
}))

export default function LoginContent() {
    const classes = useStyles()
    const [isSuccess, setSuccess] = useState(false)
    const [isDenied, setDenied] = useState(false)
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=25ea82ddd98f4bf9bb3f9c9db8db37a2&redirect_uri=http://localhost:3000/login/&scope=user-follow-read%20user-read-recently-played%20user-read-currently-playing%20user-modify-playback-state%20playlist-read-collaborative%20streaming%20user-library-read%20user-read-private%20user-read-email%20user-library-modify&response_type=token&show_dialog=true`;

    const path = window.location.href
    if (path.includes("token") && !isSuccess) {
        parseToken()
        setSuccess(true)
    }
    if (path.includes("error") && !isDenied) {
        setDenied(true)
        localStorage.setItem("token", '')
    }
    if (!path.includes("token") && !path.includes("error") && (isDenied || isSuccess)) {
        setSuccess(false)
        setDenied(false)
    }

    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar className={classes.navbar}>
                    <Typography>
                        <img className={classes.logo} src={"/img/logo_black.png"} alt="logo" width="200" height="60"/>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box className={classes.container}>
                <Button href={loginUrl} variant="contained" size="large" color="secondary"
                        className={clsx(classes.loginBtn, {[classes.hide]: isSuccess})}>
                    Login with Spotify
                </Button>

                <Typography variant="h4" gutterBottom className={clsx({[classes.hide]: !isSuccess})}>
                    Successful login!
                </Typography>
                <Typography variant="h4" gutterBottom className={clsx({[classes.hide]: !isDenied})}>
                    Access denied. Try again!
                </Typography>

                <Link to={"/"} className={classes.link}>
                    <Button variant="contained" size="large" color="secondary"
                        className={clsx(classes.loginBtn, {[classes.hide]: !isSuccess})}>
                        Return to home
                    </Button>
                </Link>
                <Link to={"/player"} style={{textDecoration: "none"}}>
                    <Button variant="contained" size="large" color="secondary"
                        className={clsx(classes.loginBtn, {[classes.hide]: !isSuccess})}>
                        Go to web-player
                    </Button>
                </Link>
            </Box>
        </div>
    )
}
