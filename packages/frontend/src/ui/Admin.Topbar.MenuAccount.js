import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { useApolloClient } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
    iconButton: {
        padding: 0,
    },
}));
export default function SimpleMenu() {
    const client = useApolloClient()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const openMenu = event => {
        setAnchorEl(event.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={openMenu}>
                <AccountCircleRoundedIcon fontSize="large" />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
                <MenuItem onClick={closeMenu}>Profile</MenuItem>
                <MenuItem onClick={closeMenu}>My account</MenuItem>
                <MenuItem onClick={() => {
                    client.resetStore()
                    closeMenu()
                }}>Logout</MenuItem>
            </Menu>
        </>
    );
}
