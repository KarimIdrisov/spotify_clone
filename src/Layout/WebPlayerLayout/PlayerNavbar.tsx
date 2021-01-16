import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
    Avatar, Button,
    ClickAwayListener, Divider,
    Grow,
    IconButton,
    InputBase, InputBaseProps,
    List,
    ListItem, MenuItem, MenuList,
    Paper,
    Popper
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from "@material-ui/icons/Search";
import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        textTransform: "capitalize",
        fontSize: 14,

    },
    flex: {
        flexGrow: 1,
    },
    appbar: {
        height: "60px",
        backgroundColor: "#000000",
    },
    toolbar: {
        marginLeft: "210px",
    },
    navigation: {
        marginRight: 10,
        marginLeft: 10,
        fontSize: 15,
        color: "#FFFFFF"
    },
    hide: {
        display: "none",
    },
    search: {
        position: 'relative',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        backgroundColor: "#FFFFFF",
        borderRadius: "30px",
    },
    searchIcon: {
        color: "#000000",
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: '#000000',
    },
    inputInput: {
        color: "#000000",
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
    link: {
        textDecoration: "none",
        color: "#FFFFFF"
    }
}));

export default function PlayerNavbar(props: {
    input: string | undefined;
    inputChange: any; // onchange works bad with Function
}) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleCloseAndLogout = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        localStorage.setItem("token", '')
        setOpen(false);
    };

    const bar = [
        {id: 0, name: "Плейлисты", url: "/player/library/playlists"},
        {id: 1, name: "Исполнители", url: "/player/library/artists"},
        {id: 2, name: "Треки", url: "/player/library/tracks"}]

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton style={{color: "#FFFFFF"}}>
                        <ArrowBackIosIcon style={{marginLeft: 10}}/>
                    </IconButton>
                    <IconButton style={{color: "#FFFFFF"}}>
                        <ArrowForwardIosIcon style={{marginLeft: 5}}/>
                    </IconButton>
                    {window.location.href.includes("search") ? (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Укажи исполнителя или трек" value={props.input}
                                       onChange={props.inputChange}
                                       classes={{root: classes.inputRoot, input: classes.inputInput}}
                                       inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    {window.location.href.includes("library") ? (
                        <>
                            <List style={{display: "flex"}}>
                                {bar.map((item) => (
                                    <Link to={item.url} className={classes.link}>
                                        <ListItem button key={item.id}
                                                  selected={selectedIndex === item.id}
                                                  onClick={(event) =>
                                                      handleListItemClick(event, item.id)}>
                                            <ListItemText color={"#b3b3b3"} primary={item.name}/>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </>
                    ) : (
                        <></>
                    )}
                    <span className={classes.flex}/>
                    <Button color="inherit"
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}>
                        <Avatar/>
                    </Button>

                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{transformOrigin: "bottom"}}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow">
                                            <Link to={"/account"} style={{textDecoration: "none", color: '#000000'}}>
                                                <MenuItem onClick={handleClose}>Аккаунт</MenuItem>
                                            </Link>
                                            <Link to={"/"} style={{textDecoration: "none", color: '#000000'}}>
                                                <MenuItem onClick={handleCloseAndLogout}>Выход</MenuItem>

                                            </Link>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
        </div>
    );
}