// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'CustomFont';
    src: url('/fonts/MangoDdobak-B.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'CustomFont';
    src: url('/fonts/MangoDdobak-R.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'CustomFont';
    src: url('/fonts/MangoDdobak-L.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
  }

  body {
    font-family: 'CustomFont', sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  #__next {
    height: 100%;
  }
`;

export default GlobalStyle;
