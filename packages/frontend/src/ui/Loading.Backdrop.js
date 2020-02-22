import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { UI_LOADING_BACKDROP } from 'gql/actions'
const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SimpleBackdrop() {
    const client = useApolloClient()
    const { loading, data } = useQuery(UI_LOADING_BACKDROP);
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleToggle = () => {
    //     setOpen(!open);
    // };
    if (loading)
        return <></>
    else
        return (

            // <div>
            //   <Button variant="outlined" color="primary" onClick={handleToggle}>
            //     Show backdrop
            //   </Button>
            <Backdrop
                className={classes.backdrop}
                open={data.ui_loading_backdrop}
                onClick={() => {
                    client.writeData({
                        data: {
                            ui_loading_backdrop: false
                        }
                    })
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            // </div>
        );
}
