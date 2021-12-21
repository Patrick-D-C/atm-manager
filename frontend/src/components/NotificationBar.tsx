import { Button, IconButton, Snackbar } from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"
import React from "react"
import { useAuth } from "../context/auth";


const NotificationBar: React.FC = () => {
    const { notification, createNotification } = useAuth();
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(notification)}
            autoHideDuration={6000}
            onClose={() => createNotification(null)}
            message={notification}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => createNotification(null)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}

export default NotificationBar;