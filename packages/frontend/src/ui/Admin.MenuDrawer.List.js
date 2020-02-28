import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default ({ openDrawer }) => {
    console.log('Render MenuDrawerList')
    const classes = useStyles()
    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={openDrawer(false)}
            onKeyDown={openDrawer(false)}
        >
            <List>
                <Link to={
                    {
                        pathname: `/purchases/panel`,
                        state: {
                            hellow: "world"
                        }
                    }
                }>
                    <ListItem>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Purchases->Panel" />
                    </ListItem>
                </Link>
            </List>

            {/* list2 */}
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    // <Link to={text}>
                    <ListItem key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    // </Link>
                ))}
            </List>

        </div >
    )
}