import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import DrawerList from './Drawer.list'
export default () => {
  console.log('Render Drawer')
  const [state, setState] = React.useState({
    open: false
  });

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open });
  };



  const Component = () => {
    return (
      <Drawer open={state.open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    )
  }
  return {
    Component,
    toggleDrawer: toggleDrawer
  }
}
