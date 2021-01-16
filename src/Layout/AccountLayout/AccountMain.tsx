import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@material-ui/core";
import FetchRequest from "../../utils/FetchRequest";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "80px",
        paddingTop: "60px",
        justifyContent: "center",
    },
    table: {
        textAlign: "center",
        margin: "auto",
        width: "40%",
        marginBottom: 40
    },
    row: {
        margin: 10
    }
}));

export default function AccountMain() {
    const classes = useStyles();

    const [profile, setProfile] = useState({
        display_name: '',
        email: '',
        id: '',
        country: '',
    })

    useEffect(() => {
        async function getProfile() {
            const rsp = await FetchRequest("me");
            setProfile({
                display_name: rsp.display_name,
                email: rsp.email,
                id: rsp.id,
                country: rsp.country,
            });
        }
        getProfile()
    }, [])

    return (
        <div className={classes.root}>
            <TableContainer component={Paper} className={classes.table}>
                <Table size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: 40}}>Профиль</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell component="th" scope="row">Имя пользователя</TableCell>
                            <TableCell align="right">{profile.display_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Электронная почта</TableCell>
                            <TableCell align="right">{profile.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">ID</TableCell>
                            <TableCell align="right">{profile.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Страна или регион</TableCell>
                            <TableCell align="right">{profile.country}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
