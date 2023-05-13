import React from "react";
import { Link, Typography } from "@mui/material";

const MainFooter = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      <Link
        color="inherit"
        href="https://master--voluble-otter-f2f9c8.netlify.app/"
      >
        Podcast Word
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

export default MainFooter;
