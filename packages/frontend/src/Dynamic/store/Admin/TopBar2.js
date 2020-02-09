import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Logo } from './logo.svg';
import TabAnt from '../Vidalii/Tab.Ant'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputSearch from "../Vidalii/Input.Search";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    iconButton: {
        padding: 0,
    },
}));

const Main = ({ toggleDrawer }) => {
    console.log('Render TopBar2')
    const classes = useStyles();

    return (
        <Grid
            className={classes.root}
            container
        //  spacing={1}
        >
            <Grid
                className={classes.item}
                item xs={1}
                container
                direction="row"
                alignItems="center"
            >
                <IconButton className={classes.iconButton} aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Logo width={45} height={45} />
            </Grid>
            <Grid
                className={classes.item}
                item xs={8} >
                <TabAnt />
            </Grid>
            <Grid
                className={classes.item}
                item xs={2}>
                {/* <InputSearch /> */}
            </Grid>
            <Grid
                className={classes.item}
                item
                xs={1}
                container
                direction="row"
                justify="flex-end">
                <IconButton className={classes.iconButton} color="primary" aria-label="directions">
                    <AccountCircleRoundedIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>

    );
}

const neverReRender = () => true
export default React.memo(Main, neverReRender);
