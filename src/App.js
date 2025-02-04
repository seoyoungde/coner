import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import Main from "./pages/Main";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* 모든 경로를 Main 컴포넌트로 위임 */}
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
