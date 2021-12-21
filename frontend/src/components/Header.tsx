import React, { useState } from 'react';
import clsx from 'clsx';
import {
    AppBar,
    Avatar,
    Button,
    createStyles,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useAuth } from '../context/auth';

import { Link, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        headerBar: {
            display: 'flex',
            justifyContent: 'space-between',
        }
    }),

);

export function Header(props: any) {
    const classes = useStyles();
    const history = useHistory();
    const { signed, logout, user } = useAuth();

    const { handleDrawerOpen, openDrawer } = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
    }
    function navigateToPerfil() {
        history.push('/usuario/edit');
    }

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: openDrawer,
            })}
        >
            <Toolbar className={classes.headerBar}>
                {signed &&
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openDrawer,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                }
                <Typography variant="h6" color='inherit' noWrap>
                    ATM Manager
                </Typography>
                {signed ? (
                    <React.Fragment>
                        <Button aria-controls="simple-menu" color="inherit" aria-haspopup="true" onClick={handleClick}>
                            <Avatar className="mr-2"></Avatar> {user?.name}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem><Button href="/usuario/edit">Edit Perfil</Button></MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </React.Fragment>
                ) : (
                    <Button href="/login" color="inherit">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}