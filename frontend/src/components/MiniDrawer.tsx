import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Link } from '@material-ui/core';
import { useAuth } from '../context/auth';
import { Dashboard as DashboardIcon, LocalMall, TransferWithinAStation } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
    }),

);


const MiniDrawer = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();

    const { handleDrawerClose, openDrawer } = props;
    const { user } = useAuth();


    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: openDrawer,
                [classes.drawerClose]: !openDrawer,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: openDrawer,
                    [classes.drawerClose]: !openDrawer,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <Link href="/painel">
                    <ListItem button key="painel">
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Painel" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link href="/operacoes">
                    <ListItem button key="operacoes">
                        <ListItemIcon><TransferWithinAStation /></ListItemIcon>
                        <ListItemText primary="Operações" />
                    </ListItem>
                </Link>
                {user?.admin && (
                    <Link href="/pacotes">
                        <ListItem button key="pacotes">
                            <ListItemIcon><LocalMall /></ListItemIcon>
                            <ListItemText primary="Pacotes" />
                        </ListItem>
                    </Link>
                )}
            </List>
        </Drawer>

    );
}

export default MiniDrawer;