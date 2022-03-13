import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

const useStyles = makeStyles({
  menuContainer: {
    width: "300px",
    height: "300px",
  },
});

export default function TotalAvatars({ buttonName, user, givenName }) {
  const baseURL =
    "https://zestcafe-4edf3-default-rtdb.asia-southeast1.firebasedatabase.app/zestgeekDatabase.json";
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = React.useState(false);
  localStorage.setItem("userList", user);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const open = Boolean(anchorElUser);
  return (
    <>
      <AvatarGroup
        max={4}
        min={3}
        sx={{ cursor: "pointer" }}
        onClick={handleOpenUserMenu}
      >
        {user
          ?.filter((item) => item.name === buttonName)
          .map((people) => (
            <Tooltip title={people.givenName} placement="top">
              <IconButton sx={{ p: 0 }}>
                <Avatar src={people.imageUrl} sx={{ width: 34, height: 34 }} />
              </IconButton>
            </Tooltip>
          ))}
      </AvatarGroup>
      <Menu
        className={classes.menuContainer}
        sx={{ mt: "40px", width: "1000px" }}
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
        open={open}
        onClose={handleCloseUserMenu}
      >
        {user
          ?.filter((item) => item.name === buttonName)
          .map((users, index) => (
            <MenuItem
              sx={{ width: "200px", overflow: "scroll" }}
              key={index}
              onClick={handleCloseUserMenu}
            >
              <Avatar src={users.imageUrl} sx={{ width: 34, height: 34 }} />
              <Typography sx={{ marginLeft: "15px" }} textAlign="center">
                {users.givenName}
              </Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
