import React from "react";
import { createStyles, CssBaseline, makeStyles, Theme } from "@material-ui/core";
import MiniDrawer from "./MiniDrawer";
import { Header } from "./Header";
import { useAuth } from "../context/auth";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            marginTop: 50,
        },
    }),

);

const Component: React.FC = ({ children }) => {
    const classes = useStyles();
    const { signed } = useAuth();
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header handleDrawerOpen={handleDrawerOpen} openDrawer={openDrawer} />
            {signed && (
                <MiniDrawer handleDrawerClose={handleDrawerClose} openDrawer={openDrawer} />
            )}
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
}


export { Component };