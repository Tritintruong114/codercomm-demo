import { Stack, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

///
const MainLayout = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
};

export default MainLayout;
