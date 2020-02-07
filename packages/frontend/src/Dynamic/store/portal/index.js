import React from 'react';
import AppBarTop from './AppBarTop'
import useDrawer from './useDrawer'
import ListDrawer from './ListDrawer'
export default () => {
    console.log('Render IndexPortal')
    const { Component: Drawer, toggleDrawer } = useDrawer()
    return (
        <>
            <AppBarTop toggleDrawer={toggleDrawer} />
            <Drawer>
                <ListDrawer toggleDrawer={toggleDrawer} />
            </Drawer>
        </>
    )
}

