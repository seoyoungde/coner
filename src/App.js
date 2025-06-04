import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import Main from "./pages/Main";
import { RequestProvider } from "./context/context";

const App = () => {
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  window.addEventListener("resize", setViewportHeight);
  setViewportHeight();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RequestProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </Router>
      </RequestProvider>
    </ThemeProvider>
  );
};

export default App;
