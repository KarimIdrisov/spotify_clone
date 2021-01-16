import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FetchRequest from "../../utils/FetchRequest";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    grid: {
        marginLeft: 5,
        marginTop: 2
    }
}))

export default function PlayerLibraryPlaylists() {
    localStorage.setItem("player", "library")
    const classes = useStyles()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getCategories() {
            const rsp = await FetchRequest("me/");
            setCategories(rsp)
        }

        getCategories();
    }, []);

    return (
        <>
        </>
    )
}
