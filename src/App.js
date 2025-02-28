import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import Main from "./pages/Main";
import { RequestProvider } from "./context/context";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RequestProvider>
        {/* ✅ RequestProvider로 감싸기 */}
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
