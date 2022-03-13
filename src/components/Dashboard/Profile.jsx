import React, { useState } from "react";
import Box from "@mui/material/Box";
import "../../App.css";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logout from './logout'
import { getAuth, signOut } from "firebase/auth";
import {  useNavigate } from "react-router-dom";

const settings = [ "Logout"];
const Profile = ({ imageUrl }) => {
	const auth = getAuth();
	const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = (e) => {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate("/");
			})
			.catch((error) => {
				// An error happened.
				console.log("Signout Error....", error);
			});
	};
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="profile" src={imageUrl} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" , width:'160px'}}
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <box onClick={handleSignOut}>
              <Logout   textAlign="center" >{setting}</Logout>
              </box>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default Profile;
