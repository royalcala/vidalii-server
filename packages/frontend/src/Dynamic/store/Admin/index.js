import React from 'react';
import { Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

///Components
import useDrawer from '../Vidalii/Drawer'
import DrawerList from './Drawer.List'
import Purchases from '../Modules/Purchases'
// import SalesDashboard from '../Modules/Sales.dash'
import SalesDoc from '../Modules/Sales.Doc'
import Default from '../Modules/Default'
// import TopBar from './TopBar'
import TopBar from './TopBar'
import Box from '@material-ui/core/Box';

export default () => {
    console.log('Render IndexPortal')
    const { Component: Drawer, toggleDrawer } = useDrawer(DrawerList)
    return (
        <Box display="flex" flexDirection="column">
            <TopBar toggleDrawer={toggleDrawer} />
            <Switch>
                <Route path="/sales/document" component={SalesDoc} />
                <Route exact path="/purchases/:myKey/:myKey2" component={Purchases} />
                <Route exact path="/" component={Default} />
            </Switch>
            <Drawer />
        </Box>
    )
}

