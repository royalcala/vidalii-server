import React from 'react'
import { Route, Switch } from "react-router-dom";
import TopBar from 'ui/Admin.Topbar'
import MenuDrawer from 'ui/Admin.MenuDrawer'
import Default from "ui/App.Default";
import Purchases from 'ui/App.Purchases.Panel'
const Admin = props => {
    console.log('Render Admin***')
    return (
        <>
            <TopBar />
            <Switch>
                <Route path="/sales/document" component={() => <div>Sales</div>} />
                <Route exact path="/purchases/panel" component={Purchases} />
                <Route path="/" component={Default} />
            </Switch>
            <MenuDrawer />
        </>
    )
}
Admin.displayName = "Changing the name of component Admin.js"
export default Admin