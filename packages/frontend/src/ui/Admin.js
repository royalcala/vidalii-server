import React from 'react'
import { Route, Switch } from "react-router-dom";
import CloseSession from 'ui/Admin.CloseSession'
import TopBar from 'ui/Admin.Topbar'
import { backdrop } from 'ui_state'
const Admin = props => {
    console.log('Render Admin***')

    return (
        <>
            <TopBar />
            <CloseSession />
            <Switch>
                <Route path="/sales/document" component={() => <div>Sales</div>} />
                <Route exact path="/purchases/:myKey/:myKey2" component={() => <div>Purchases</div>} />
                <Route exact path="/" component={() => <div>DefaultRoute</div>} />
            </Switch>
        </>
    )
}
Admin.displayName = "Changing the name of component Admin.js"
export default Admin