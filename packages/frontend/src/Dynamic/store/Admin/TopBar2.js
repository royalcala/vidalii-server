import React from 'react';
import { useTheme } from '@material-ui/core/styles';
// import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Logo } from './logo.svg';
import TabAnt from '../Vidalii/Tab.Ant'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import InputSearch from "../Vidalii/Input.Search";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Box from '@material-ui/core/Box';
// const useStyles = makeStyles(theme => ({
//     // root: {
//     //     borderBottom: '1px solid #e8e8e8',
//     // },
//     iconButton: {
//         padding: 0,
//     },
// }));

const Main = ({ toggleDrawer }) => {
    console.log('Render TopBar2')
    // const classes = useStyles();
    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="row" flexWrap="nowrap"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={1}
            //doesnt work the color here 
            // borderColor="grey.200"
            // borderBottom={`1px solid #e8e8e8`}
            borderBottom={`1px solid ${theme.palette.grey[200]}`}
        // color="grey.200"
        >
            <Box
                // flexGrow={1} 
                display="flex" flexDirection="row" flexWrap="nowrap">
                <Box>
                    <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Logo width={45} height={45} />
                </Box>
            </Box>
            <Box flexGrow={8}>
                <TabAnt />
            </Box>
            <Box color="primary.main" display="flex" flexDirection="row" flexWrap="nowrap">
                <AccountCircleRoundedIcon fontSize="large" />
            </Box>
        </Box>

    );
}

const neverReRender = () => true
export default React.memo(Main, neverReRender);
