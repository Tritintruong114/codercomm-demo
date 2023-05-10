import { Link as RouterLink } from "react-router-dom";
import logo1 from "../logo1.png";
import React from "react";
import { Box } from "@mui/material";

const Logo = ({ disabledLink = false, sx }) => {
  const logo = (
    <Box sx={{ width: 60, height: 60, ...sx }}>
      <img className="rounded-full" src={logo1} alt="logo" width="100%"></img>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
