import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Layout from "../Layout/Layout";
import LoginContent from "../Layout/LoginLayout/LoginContent";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

export default function Login() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Layout parent="login" updateData={undefined} input={undefined}>
                <LoginContent/>
            </Layout>
        </div>
    )
}
