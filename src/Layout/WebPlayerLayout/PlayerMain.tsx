import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {List, Typography} from "@material-ui/core";
import CategoriesCards from "./CategoriesCards";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

}))

interface ICategory {
    id: string;
    name: string;
}

export default function PlayerMain(props: {
    categories: any | undefined;
}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folders">
                {props.categories.map((category: ICategory, index: number) => (
                    <div key={index}>
                        <Typography variant="h6">
                            {category.name}
                        </Typography>
                        <CategoriesCards index={index} category={category.id}/>
                    </div>
                ))}
            </List>
        </div>
    )
}
