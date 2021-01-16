import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from "clsx";
import {Link} from "react-router-dom";
import {AppBar, IconButton, ListItemIcon, Toolbar, Typography} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';

const drawerWidth = 232;

const useStyles = makeStyles((theme) => ({
    appBar: {
        height: "80px",
        position: "relative",
        display: "inline-block",
        width: drawerWidth,
        background: "#000000",
        color: "#2f2c2c",
        zIndex: 9999,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    root: {
        color: "#FFFFFF",
        backgroundColor: "#000000",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        color: "#FFFFFF",
        backgroundColor: "#000000",
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 20,
    },
    link: {
        textDecoration: "none",
        fontWeight: "bold",
        color: "#000000",
        display: "inline",
        marginRight: 10,
    },
    divider: {
        background: "#757575",
        marginRight: 10,
        marginLeft: 10
    },
    link2: {
        textDecoration: "none",
        color: "#FFFFFF"
    },
    selected: {
        backgroundColor: "#282828",
        borderRadius: 30,
    }

}));

export default function PlayerSidebar() {
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    useEffect(() => {
        if (window.location.href.includes("search")) {
            setSelectedIndex(2)
        } else if (window.location.href.includes("library")) {
            setSelectedIndex(3)
        } else if (window.location.href.includes("favorites-tracks")) {
            setSelectedIndex(5)
        } else {
            setSelectedIndex(0)
        }
    }, [setSelectedIndex])


    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    const bar1 = [{id: 1, title: 'Главная', icon: <HomeIcon/>, url: '/player'},
        {id: 2, title: 'Поиск', icon: <SearchIcon/>, url: '/player/search'},
        {id: 3, title: 'Моя медиатека', icon: <LibraryMusicIcon/>, url: '/player/library'},]

    const bar2 = [{id: 4, title: 'Создать плейлист', icon: <PlaylistAddIcon/>, url: '/player'},
        {id: 5, title: 'Любимые треки', icon: <FavoriteIcon/>, url: '/player/favorites-tracks'}]

    return (
        <div className={classes.root}>
            <Drawer variant={"permanent"} className={classes.drawer} anchor="left" open={true}
                    classes={{paper: classes.drawerPaper}}>
                <AppBar
                    className={classes.appBar}>
                    <Toolbar>
                        <Link to="/player" className={classes.link}>
                            <IconButton color="inherit" aria-label="open drawer" edge="start"
                                        className={classes.menuButton}>
                                <img alt="logo" style={{marginTop: 10}} src={"/img/logo_white.png"} height={40}
                                     width={130}/>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>

                <List className={classes.root}>
                    {bar1.map((item,) => (
                        <Link to={item.url} key={item.id} className={classes.link2}>
                            <ListItem button className={clsx({
                                [classes.selected]: selectedIndex === item.id,
                            })}
                                      onClick={(event) => handleListItemClick(event, item.id)}>
                                <ListItemIcon style={{color: "#FFFFFF"}}>{item.icon}</ListItemIcon>
                                <ListItemText color={"#b3b3b3"} primary={item.title}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Typography style={{marginLeft: 18, color: "#b3b3b3"}}>
                    ПЛЕЙЛИСТЫ
                </Typography>
                <List className={clsx(classes.root)}>
                    {bar2.map((item) => (
                        <Link to={item.url} key={item.id} className={classes.link2}>
                            <ListItem button className={clsx({
                                [classes.selected]: selectedIndex === item.id
                            })}
                                      onClick={(event) => handleListItemClick(event, item.id)}>
                                <ListItemIcon style={{color: "#FFFFFF"}}>{item.icon}</ListItemIcon>
                                <ListItemText color={"#b3b3b3"} primary={item.title}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider className={classes.divider}/>
            </Drawer>
        </div>
    );
}
