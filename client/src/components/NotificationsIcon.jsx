import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Menu, MenuItem } from "@mui/material";

function NotificationsIcon() {
  const [notificationsCount, setNotificationsCount] = React.useState(0);
  const [notifications, setNotifications] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    // Fetch notifications
    setNotifications(null);
    setNotificationsCount(1);
  }, []);

  const handleOpenNotifications = () => {
    setAnchorEl(true);
    setNotificationsCount(0);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpenNotifications}
        sx={{
          mr: 1,
        }}
      >
        <Badge badgeContent={notificationsCount} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        sx={{
          mt: "45px",
        }}
        slotProps={{
          paper: {
            sx: {
              width: "25ch",
            },
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {notifications ? (
          notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleCloseNotifications}>
              {notification.content}
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleCloseNotifications}>
            No new notifications
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default NotificationsIcon;
