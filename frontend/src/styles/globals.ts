'use client'

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #f7f7f7;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
