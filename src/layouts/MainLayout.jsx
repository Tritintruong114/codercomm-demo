import { Stack, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";

///
const MainLayout = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <AlertMsg />
      <Outlet />

      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
};

export default MainLayout;
