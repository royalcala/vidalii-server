import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default () => {
  console.log('Render Drawer')
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };



  const Component = (props) => {


    return (
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {/* {sideList('left')} */}
        {/* <ListDrawer /> */}
        {props.children}
      </Drawer>
    )
  }
  return {
    Component,
    toggleDrawer: (open) => toggleDrawer('left', open)
  }
}
