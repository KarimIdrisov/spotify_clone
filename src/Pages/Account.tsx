import React from 'react';
import Layout from "../Layout/Layout";
import {makeStyles} from "@material-ui/core/styles";
import AccountMain from "../Layout/AccountLayout/AccountMain";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));
export default function Account() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Layout parent="home" updateData={undefined} input={undefined}>
                <AccountMain/>
            </Layout>
        </div>
    );
};