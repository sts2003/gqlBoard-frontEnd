import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "../styles/Theme";
import GlobalStyles from "../styles/GlobalStyles";
import AppRouter from "./AppRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
