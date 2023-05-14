import React from "react";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import customizeComponent from "./customizations";

const PRIMARY = {
  lighter: "#f0fce9",
  light: "#ddf7d0",
  main: "#bc5e44",
  dark: "#2e711a",
  darker: "#254c1b",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#c5dbf2",
  light: "#92bde7",
  main: "#4993d4",
  dark: "#1c4670",
  darker: "#1d3c5d",
  contrastText: "#fff",
};

const SUCCESS = {
  50: "#eefde8",
  100: "#d8facd",
  200: "#b5f5a1",
  300: "#7bea5d",
  400: "#5dde3d",
  500: "#3cc41e",
  600: "#2b9c14",
  700: "#227714",
  800: "#215e16",
  900: "#1e5017",
  950: "#0a2c07",
  1000: "#fff",
};

const GREY = {
  50: "#f7f7f7",
  100: "#e3e3e3",
  200: "#c8c8c8",
  300: "#a4a4a4",
  400: "#818181",
  500: "#666666",
  600: "#4d4d4d",
  700: "#434343",
  800: "#383838",
  900: "#313131",
  950: "#1a1a1a",
};
const ThemeProvider = ({ children }) => {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
    },
    shape: { borderRadius: 8 },
    text: { primary: GREY[600], secondary: GREY[800], disabled: GREY[400] },
    background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
    action: {
      active: GREY[600],
      hover: GREY[500],
      selected: GREY[700],
      disabled: GREY[600],
      disabledBackground: GREY[500],
      focus: GREY[800],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
  const theme = createTheme(themeOptions);

  theme.components = customizeComponent(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
