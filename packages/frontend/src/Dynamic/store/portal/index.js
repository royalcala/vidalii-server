import React from 'react';
import AppBarTop from './AppBarTop'
import useDrawer from './useDrawer'

export default () => {
    console.log('Render IndexPortal')
    const { Component: Drawer, toggle } = useDrawer()
    return (
        <>            
            <AppBarTop toggleDrawer={toggle} />
            <Drawer />
        </>
    )
}

