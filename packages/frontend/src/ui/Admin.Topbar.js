import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useApolloClient } from "@apollo/react-hooks";
import Box from '@material-ui/core/Box';
import MenuAccount from 'ui/Admin.Topbar.MenuAccount'
import { ReactComponent as Logo } from 'svg/google.svg';
import MenuTabs from 'ui/Admin.Topbar.MenuTabs'
import { useMenuDrawer } from "ui_resolvers";
const Main = () => {
    console.log('Render Admin.Topbar.js')
    const theme = useTheme();
    const client = useApolloClient()
    const openDrawer = useMenuDrawer(client)
    return (
        <Box display="flex" flexDirection="row"
            flexWrap="nowrap"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={1}
            //doesnt work the color here 
            // borderColor="grey.200"
            // borderBottom={`1px solid #e8e8e8`}
            borderBottom={`1px solid ${theme.palette.grey[200]}`}
        // color="grey.200"
        >
            <IconButton aria-label="menu" onClick={openDrawer(true)}>
                <MenuIcon />
            </IconButton>
            {/* <Logo width="100px" /> */}
            <Logo width={45} height={45} />
            <Box flexGrow={1}>
                <MenuTabs />
            </Box>
            <MenuAccount />
        </Box>

    );
}

const neverReRender = () => true
export default React.memo(Main, neverReRender);
