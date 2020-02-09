import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
// import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SearchIcon from '@material-ui/icons/Search';
// import { ReactComponent as Logo } from './logo.svg';
// import SvgIcon from '@material-ui/core/SvgIcon';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 5,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const Main = ({ toggleDrawer }) => {
    console.log('Render AppBarTop')
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu" onClick={toggleDrawer(true)} >
                <MenuIcon />
            </IconButton>
            {/* <SvgIcon>                
                <Logo/>
            </SvgIcon> */}
            <InputBase
                className={classes.input}
                placeholder="Search for Vidalii Modules"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <AccountCircleRoundedIcon fontSize="large" />
            </IconButton>


        </Paper>

    );
}

// // export default AppBarTop
// function areEqual(prevProps, nextProps) {
//     return true

//     /*
//     retorna true si al pasar los nextProps a renderizar retorna
//     el mismo resultado que al pasar los prevProps a renderizar,
//     de otro modo retorna false
//     */
// }
const neverReRender = () => true
export default React.memo(Main, neverReRender);
