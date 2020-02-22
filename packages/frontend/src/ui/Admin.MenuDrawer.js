import React from 'react';
import Drawer from '@material-ui/core/Drawer';
// import DrawerList from '../Admin/Drawer.list'
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { UI_MENU_DRAWER } from 'gql/actions'
import { useMenuDrawer } from "ui_resolvers/index";
const MenuDrawer = () => {
    console.log('Render MenuDrawer')
    const { loading, data } = useQuery(UI_MENU_DRAWER)
    const client = useApolloClient()
    const openDrawer = useMenuDrawer(client)
    // const [open, setOpen] = React.useState(true)
    // const openDrawer = open => event => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
    //         return;
    //     // setOpen(open);
    //     client.writeData({
    //         data: {
    //             ui_menu_backdrop: open
    //         }
    //     })
    // }
    if (loading)
        return <></>
    else
        return (
            <Drawer
                open={data.ui_menu_drawer}
                onClose={openDrawer(false)}>
                {/* <DrawerList toggleDrawer={toggleDrawer} /> */}
                <div>list1</div>
            </Drawer>
        )

}

export default MenuDrawer

// export default (DrawerList) => {
//     // console.log('DrawerList:', DrawerList)
//     // const [state, setState] = React.useState({
//     //     open: false
//     // });

//     const toggleDrawer = open => event => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         setState({ ...state, open });
//     }



//     const Component = () => {



//     }
//     return {
//         Component,
//         toggleDrawer: toggleDrawer
//     }
// }
