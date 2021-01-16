import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from "clsx";
import {Link} from "react-router-dom";
import {useMediaQuery} from 'react-responsive'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import {ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        textTransform: "capitalize",
        fontSize: 14,

    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        paddingLeft: "10%",
        paddingRight: "10%",
        justifyContent: "center",
        height: "80px",
        backgroundColor: "#000000",
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
    logo: {
        paddingTop: 10
    },
    textCapitalize: {
        textTransform: "capitalize",
    },
    divider: {
        backgroundColor: "#FFFFFF",
        height: 20,
        marginTop: 21,
        marginBottom: 15
    },
    textLower: {
        textTransform: "lowercase",
        paddingLeft: 3
    }
}));

export default function Navbar(props: {
    handleClick: any;
    open: boolean | undefined;
    login: boolean | undefined;
}) {
    const classes = useStyles();

    const isMediumScreen = useMediaQuery({query: '(max-width: 1050px)'})

    const leftBar = [
        {name: "Premium"},
        {name: "Справка"},
        {name: "Скачать"}
    ]


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

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar>

                    <Link className={classes.title} to={"/"}>
                        <Typography className={classes.title}>
                            <img className={classes.logo} src={"/img/logo_white.png"} alt="logo" width="130" height="40"/>
                        </Typography>
                    </Link>

                    {leftBar.map((item, index) => (
                        <Button key={index} color="inherit" className={clsx(classes.navigation, {[classes.hide]: isMediumScreen})}>
                            <span className={classes.textCapitalize}>{item.name}</span>
                        </Button>))
                    }

                    <Divider orientation="vertical" flexItem color="#FFFFFF"
                             className={clsx(classes.divider, {[classes.hide]: isMediumScreen})}/>

                    <Button color="inherit" className={clsx(classes.navigation,
                        {[classes.hide]: isMediumScreen || props.login})}>
                        <span className={classes.textCapitalize}>Зарегистрироваться</span>
                    </Button>

                    <Button color="inherit" className={clsx(classes.navigation,
                        {[classes.hide]: !props.login || isMediumScreen})}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}>
                        <span className={classes.textCapitalize}>Профиль</span>
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


                    <Link to={"/login"} style={{textDecoration: "none"}}>
                        <Button color="inherit" className={clsx(classes.navigation,
                            {[classes.hide]: isMediumScreen || props.login})}>
                            <span className={classes.textCapitalize}>Вход</span>
                            <span className={classes.textLower}>в аккаунт</span>
                        </Button>
                    </Link>

                    <IconButton onClick={() => props.handleClick()} edge="end" className={clsx({
                        [classes.hide]: !isMediumScreen
                    })} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}