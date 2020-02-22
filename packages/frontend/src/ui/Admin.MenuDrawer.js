import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import DrawerList from 'ui/Admin.MenuDrawer.List'
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { UI_MENU_DRAWER } from 'gql/actions'
import { useMenuDrawer } from "ui_resolvers/index";

const MenuDrawer = () => {
    console.log('Render MenuDrawer')
    const { loading, data } = useQuery(UI_MENU_DRAWER)
    const client = useApolloClient()
    const openDrawer = useMenuDrawer(client)
    if (loading)
        return <></>
    else
        return (
            <Drawer
                open={data.ui_menu_drawer}
                onClose={openDrawer(false)}
            >
                <DrawerList openDrawer={openDrawer} />
            </Drawer>
        )

}

export default MenuDrawer