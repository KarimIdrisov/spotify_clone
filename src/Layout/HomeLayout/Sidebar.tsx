import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import clsx from "clsx";

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import {Box} from "@material-ui/core";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
    root: {
        color: "#FFFFFF",
        backgroundColor: "#000000",
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
    closeIcon: {
        justifyContent: "right",
        paddingLeft: "280px"
    },
    link: {
        textDecoration: "none",
        color: "#FFFFFF"
    },
    divider: {
        background: "#FFFFFF",
        width: 18,
        marginLeft: 15
    }
}));

export default function Sidebar(props: {
    handleClick: any;
    open: boolean | undefined;
    login: boolean | undefined;
}) {
    const classes = useStyles();


    const bar1 = [
        {id: 1, title: 'Premium', url: '/'},
        {id: 2, title: 'Справка', url: '/'},
        {id: 3, title: 'Скачать', url: '/'}]

    const bar2 = [
        {id: 1, title: 'Зарегистрироваться', url: '/'},
        {id: 2, title: 'Вход в аккаунт', url: "/login"}]

    const bar3 = [
        {id: 1, title: 'Аккаунт', url: '/account'},
        {id: 2, title: 'Выйти', url: '/'}]

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Drawer
                className={classes.drawer}
                anchor="right"
                open={props.open}
                classes={{paper: classes.drawerPaper}}>
                <Box className={classes.closeIcon}>
                    <IconButton onClick={() => props.handleClick()} color="inherit" className={classes.root}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <List className={classes.root}>
                    {bar1.map((item) => (
                        <Link key={item.id} to={item.url} className={classes.link}>
                            <ListItem button><ListItemText primary={item.title}/></ListItem>
                        </Link>
                    ))}
                </List>

                <Divider className={classes.divider}/>

                <List className={clsx(classes.root, {[classes.hide]: props.login})}>
                    {bar2.map((item, index) => (
                        <Link key={item.id} to={item.url} className={classes.link}>
                            <ListItem button ><ListItemText primary={item.title}/></ListItem>
                        </Link>
                    ))}
                </List>

                <List className={clsx(classes.root, {[classes.hide]: !props.login})}>
                    {bar3.map((item) => (
                        <Link key={item.id} to={item.url} className={classes.link}>
                            <ListItem button><ListItemText primary={item.title}/></ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
