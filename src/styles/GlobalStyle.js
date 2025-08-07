import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: '"Noto Sans", Arial, sans-serif';
    background-color: #ffffff;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
  }
    
`;
