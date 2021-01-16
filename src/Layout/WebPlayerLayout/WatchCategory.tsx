import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FetchRequest from "../../utils/FetchRequest";

import {Card, CardContent, CardMedia, Grid, Typography}
    from "@material-ui/core";
import {Link} from "react-router-dom";

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
    },
    grid: {
        marginLeft: 5,
        marginTop: 10,
    },
    card2: {
        height: 250,
        backgroundColor: "#121212",
        display: "block",
        boxShadow: '1',
    },
}));

interface IPlaylist {
    description: string;
    name: string;
    images: [IImages];
    owner: IOwner;
    id: string;
}

interface IImages {
    url: string;
}

interface IOwner {
    display_name: string;
}

export default function WatchCategory() {
    const classes = useStyles();


    const categoryId = props.match.params.categoryID
    const [category, setCategory] = useState({
        name: '',
        url: '',
    })
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        async function getPlaylists() {
            const rsp = await FetchRequest("browse/categories/" + categoryId + "/playlists?&limit=10&country=RU&locale=ru_RU");
            setPlaylists(rsp.playlists.items)
        }

        async function getCategoryDate() {
            const rsp = await FetchRequest("browse/categories/" + categoryId + '?&country=RU&locale=ru_RU');
            setCategory({
                name: rsp.name,
                url: rsp.icons[0].url,
            })
        }

        getPlaylists();
        getCategoryDate();
    }, [])

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <img style={{borderRadius: 25}} src={category.url} alt="playlist logo" height={200}/>
                <CardContent style={{marginTop: 20, color: "#FFFFFF"}}>
                    <Typography gutterBottom variant="h3" component="h2">
                        {category.name}
                    </Typography>
                </CardContent>
            </Card>
            <Grid container spacing={2} className={classes.grid}>
                {playlists.map((playlist: IPlaylist, index) => (
                    <Grid item xs={9} md={2} sm={6}>
                        <Link to={"/player/playlist/" + playlist.id} style={{textDecoration: 'none'}}>
                            <Card key={index} className={classes.card2}>
                                <CardMedia title="Album image">
                                    <img src={playlist.images[0].url} alt="album logo" height={130}
                                         width={"100%"}/>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="subtitle1" style={{color: "#FFFFFF"}} component="p">
                                        {playlist.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
