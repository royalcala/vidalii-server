import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

///Components
import useDrawer from './Drawer'
import Purchases from '../Modules/Purchases'
import SalesDashboard from '../Modules/Sales.dash'
import SalesDoc from '../Modules/Sales.Doc'
import Default from '../Modules/Default'
import TopBar from './TopBar'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
export default () => {
    console.log('Render IndexPortal')
    const classes = useStyles()
    const { Component: Drawer, toggleDrawer } = useDrawer()
    return (
        <div className={classes.root}>
            <Grid
                container spacing={1}
            >
                <Grid item xs={12}>
                    <TopBar toggleDrawer={toggleDrawer} />                    
                </Grid>
                <Grid item xs={12}>
                    <Switch>
                        <Route path="/sales/document" component={SalesDoc} />
                        <Route exact path="/purchases/:myKey/:myKey2" component={Purchases} />
                        <Route exact path="/" component={Default} />
                    </Switch>                    
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid> */}
            </Grid>
            <Drawer />
        </div>
    )
}

