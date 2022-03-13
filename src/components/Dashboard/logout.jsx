import React, { useState } from "react";
import Box from "@mui/material/Box";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const responseGoogle = (error) => {
    console.log(error, "response");
    if (error) {
      navigate("/");
    }
  };
  return (
    <Box
      sx={{
        width: "200px",
        margin: "auto",
        alignItems: "center",
      }}
      onClick={responseGoogle}
    >
      <GoogleLogout
        clientId="343449356788-4ipb7l9v72hqkkbcrgov3pbeetgg9e72.apps.googleusercontent.com"
        buttonText="Logout"
        onFailure="responseGoogle"
      ></GoogleLogout>
    </Box>
  );
}
