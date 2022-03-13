import React, { useEffect, useState } from "react";
import Box from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import TotalAvatars from "../../commonComponents/avtarGroup/AvtarGroup";

const useStyles = makeStyles({
  button: {
    width: "fit-content",
    minWidth: "170px",
    minHeight: "250px",
    // height: "fit-content",
    display: "block",
    padding: "15px 25px",
    fontSize: "24px",
    textAlign: "center",
    textDecoration: " none",
    outline: " none",
    marginTop: "15px",
    marginLeft: "20px",
    borderRadius: "15px",
    border: "2px #c1c1c1 solid",
    justifyContent: "center",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    margin: "auto",
    borderRadius: "50%",
  },
  icon: {
    width: "100px",
    textAlign: "center",
    cursor: "pointer",
  },
  heading: {
    color: "brown",
    fontSize: "20px",
    marginBottom: "10px",
    cursor: "unset",
  },
});
const CustomButton = ({ buttonName, image, onClick, user, givenName }) => {
  const classes = useStyles();

  return (
    <Box className={classes.button} onClick={onClick} name={buttonName}>
      <Box className={classes.container} onClick={onClick} name={buttonName}>
        <img
          className={classes.icon}
          src={image}
          alt="img"
          onClick={onClick}
          name={buttonName}
        />
      </Box>
      <Box className={classes.heading} name={buttonName} onClick={onClick}>
        {buttonName}
      </Box>
      <TotalAvatars buttonName={buttonName} user={user} givenName={givenName} />
    </Box>
  );
};

export default CustomButton;
