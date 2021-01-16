import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import clsx from "clsx";

import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "80px",
        flexGrow: 1
    },
    first: {
        borderRadius: 0,
        color: "#a5ffef",
        textAlign: "center",
        padding: 10,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#bb48c4"
    },
    second: {
        borderRadius: 0,
        color: "#1ED760",
        textAlign: "center",
        padding: 10,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#2D46B9"
    },
    btn: {
        margin: 5,
        borderRadius: 35,
        background: "#9BF0E1",
    },
    btn2: {
        margin: 5,
        borderRadius: 35,
        background: "#1ED760",
    },
    hide: {
        display: "none",
    },
    third: {
        borderRadius: 0,
        color: "#090909",
        textAlign: "center",
        padding: 10,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#ffffff"
    },
    btn3: {
        margin: 5,
        borderRadius: 35,
        background: "#ffffff",
        borderColor: "#000000",
        border: "1px solid",
    },
    grid: {
        marginTop: 10,
    },
    link: {
        textDecoration: "none",
        color: "#000000"
    },
    subtitle: {
        fontSize: 20,
        margin: 20
    },
    title: {
        fontSize: 80,
        margin: 20
    },
    card: {
        borderColor: "#FFFFFF",
        height: 500
    }

}))

interface IAlbum {
    name: string;
    images: [IImages];
    owner: IOwner;
    url: string;
    id: string;
}
interface IImages {
    url: string;
}
interface IOwner{
    display_name: string;
}

export default function MainContent(props: {
    albums: [] | undefined;
    login: boolean | undefined;
}) {
    const classes = useStyles()
    const albums = props.albums
    return (
        <div className={classes.root}>
            <Card className={classes.first}>
                <Typography className={classes.title}>Посмотрите, что вам нравилось слушать</Typography>
                <Typography className={classes.subtitle}>
                    Узнайте, какие исполнители и треки поддерживали вас в этом непростом году.
                </Typography>
                <Button className={classes.btn}>
                    <Typography className={classes.subtitle}>Посмотреть итоги</Typography>
                </Button>
            </Card>

            <Card className={clsx(classes.second, {[classes.hide]: props.login})}>
                <Typography className={classes.subtitle}>БЕСПЛАТНАЯ ВЕРСИЯ</Typography>
                <Typography className={classes.title}>Услышать весь мир</Typography>
                <Typography className={classes.subtitle}>Миллионы треков. Бесплатно.</Typography>
                <Button className={classes.btn2}>
                    <Typography className={classes.subtitle}>Скачать бесплатную версию</Typography>
                </Button>
            </Card>

            <Card className={clsx(classes.third, {[classes.hide]: !props.login})}>
                <Typography className={classes.title}>Не знаете, что послушать?</Typography>
                <Typography className={classes.subtitle}>Начните с лучших новинок.</Typography>
                <Button className={classes.btn3}>
                    <Link to={"/player"} className={classes.link}>
                        <Typography className={classes.subtitle}>Открыть веб плеер</Typography>
                    </Link>
                </Button>

                <Grid container spacing={3} className={classes.grid}>
                    {albums?.map((album: IAlbum, index) => (
                        <Grid key={index} item xs={9} md={4} sm={6} style={{height: 550, width: 200, }}>
                            <Link to={"/player/playlist/" + album.id} style={{textDecoration: 'none'}}>
                                <Card className={classes.card}>
                                    <CardMedia title="Album image">
                                        <img src={album.images[0].url} alt="album logo" height={250} width={"100%"}/>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant="h3" color="textPrimary" component="p">
                                            {album.name}
                                        </Typography>
                                        <Typography variant="h4" color="textSecondary" component="p">
                                            {album.owner.display_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </div>
    )
}
