import * as React from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";
import { Link as MuiLink, Stack } from "@mui/material";
import DynamicAvatar from "./DynamicAvatar";
import NotificationsIcon from "./NotificationsIcon";

const pages = ["Messages", "Contacts"];
const settings = ["Profile", "Settings", "Logout"];
const menuItems = ["Login", "Signup"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElLogin, setAnchorElLogin] = React.useState(null);

  const user = useSelector((state) => state.userData.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLoginMenu = (event) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLoginMenu = () => {
    setAnchorElLogin(null);
  };

  return (
    <AppBar data-testid="app-bar" elevation={3} color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <MuiLink
            href="/"
            underline="none"
            sx={{
              color: "inherit",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="p"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CONCORD
            </Typography>
          </MuiLink>

          {/* Shown when displayed on a mobile device */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user who is authenticated"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              slotProps={{
                paper: {
                  sx: {
                    width: "25ch",
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <MuiLink href={`/${page.toLowerCase()}`} underline="none">
                    <Typography variant="button" component="p">
                      {page}
                    </Typography>
                  </MuiLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CONCORD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: "black", display: "block" }}
                href={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user.username ? (
              <>
                <NotificationsIcon />
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user.username && <DynamicAvatar name={user.username} />}
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Log In">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleOpenLoginMenu}
                >
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            )}
            {/* Menu that is shown when the users avatar is clicked
             it shows buttons to edit profile */}
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
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Stack
                direction="row"
                sx={{
                  p: 2,
                  alignItems: "center",
                }}
              >
                {user.username && <DynamicAvatar name={user.username} />}
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{
                    textAlign: "center",
                    px: 1,
                  }}
                >
                  {user.username}
                </Typography>
              </Stack>
              <Divider />
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <MuiLink href={`/${setting.toLowerCase()}`} underline="none">
                    <Typography variant="button" component="p">
                      {setting}
                    </Typography>
                  </MuiLink>
                </MenuItem>
              ))}
            </Menu>
            {/* Menu that is displayed when the Login icon is clicked */}
            <Menu
              sx={{
                mt: "45px",
              }}
              slotProps={{
                paper: {
                  sx: {
                    width: "15ch",
                  },
                },
              }}
              id="login-appbar"
              anchorEl={anchorElLogin}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElLogin)}
              onClose={handleCloseLoginMenu}
            >
              {menuItems.map((item) => (
                <MenuItem key={item} onClick={handleCloseUserMenu}>
                  <MuiLink href={`/${item.toLowerCase()}`} underline="none">
                    <Typography variant="button" component="p">
                      {item}
                    </Typography>
                  </MuiLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
