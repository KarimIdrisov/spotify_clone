import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

import {Card, Grid, IconButton, Typography} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
    },
    footer: {
        padding: "50px",
        background: "#000000",
        position: "relative",
        bottom: 0,
        left: 0,
        height: "500px",
        width: "100%",
        overflowX: 'hidden',
        whiteSpace: "normal",
    },
    inline: {
        display: "inline",
    },
    logo: {
        paddingTop: 10,
        marginRight: 3
    },
    header: {
        color: "#726f6f",
        marginTop: 25
    },
    subtitle: {
        color: "#FFFFFF",
        marginTop: 10
    },
    link: {
        textDecoration: "none",
        color: "#FFFFFF",
    },
    logos: {
        background: "#000000",
        display: "inline"
    },
    logoMap: {
        color: "#FFFFFF",
        marginTop: 30,
        marginRight: 12,
        background: "#222326"
    }
}));

export default function Footer() {
    const classes = useStyles();

    const company = [
        {name: "О нас"},
        {name: "Вакансии"},
        {name: "For the Record"}]
    const community = [
        {name: "Для исполнителей"},
        {name: "Для разработчиков"},
        {name: "Реклама"},
        {name: "Для инвесторов"},
        {name: "Для вендоров"}]
    const urls = [
        {name: "Справка", url: '/'},
        {name: "Веб-плеер", url: '/login'},
        {name: "Бесплатное мобильное приложение", url: '/'},
        {name: "ВОТ ЭТО 2020", url: '/'}]
    const logos = [
        {logo: <InstagramIcon/>},
        {logo: <TwitterIcon/>},
        {logo: <FacebookIcon/>}
    ]

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Grid container spacing={2}>

                    <Grid item xs>
                        <Card className={classes.inline}>
                            <Typography>
                                <img className={classes.logo} src={"/img/logo_white.png"}
                                     alt="logo" width="140" height="60"/>
                            </Typography>
                        </Card>
                    </Grid>

                    <Grid item xs>
                        <Card className={classes.inline}>
                            <Typography className={classes.header}>КОМПАНИЯ</Typography>
                            {company.map((item, index) => (
                                <Link key={index} to={"/"} className={classes.link}>
                                    <Typography className={classes.subtitle}>{item.name}</Typography>
                                </Link>
                            ))}
                        </Card>
                    </Grid>

                    <Grid item xs>
                        <Card className={classes.inline}>
                            <Typography className={classes.header}>СООБЩЕСТВА</Typography>
                            {community.map((item, index) => (
                                <Link key={index} to={"/"} className={classes.link}>
                                    <Typography className={classes.subtitle}>{item.name}</Typography>
                                </Link>
                            ))}
                        </Card>
                    </Grid>

                    <Grid item xs>
                        <Card className={classes.inline}>
                            <Typography className={classes.header}>ПОЛЕЗНЫЕ ССЫЛКИ</Typography>
                            {urls.map((item, index) => (
                                <Link key={index} to={item.url} className={classes.link}>
                                    <Typography className={classes.subtitle}>{item.name}</Typography>
                                </Link>
                            ))}
                        </Card>
                    </Grid>

                    <Grid item xs>
                        <Card className={classes.logos}>
                            {logos.map((item, index) => (
                                <IconButton key={index} className={classes.logoMap}>
                                    {item.logo}
                                </IconButton>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
            </footer>
        </div>
    )
}