import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";
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
// function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
//     let match = useRouteMatch({
//         path: to,
//         exact: activeOnlyWhenExact
//     });

//     return (
//         <div className={match ? "active" : ""}>
//             {match && "> "}
//             <Link to={to}>{label}</Link>
//         </div>
//     );
// }
export default ({ toggleDrawer }) => {
    console.log('Render ListDrawer')
    const classes = useStyles()
    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >

            <List>
                <Link to={
                    {
                        pathname: `/sales/document`,
                        state: {
                            from: "Drawer.list.js"
                        }
                    }
                }>
                    <ListItem>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Sales Doc" />
                    </ListItem>
                </Link>
            </List>
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