import React from 'react';
import ReactDOM from 'react-dom';
import {injectGlobal} from 'styled-components';
import App from './App';

// eslint-disable-next-line no-undef
ReactDOM.render(<App/>, document.getElementById('app-root'));

// Global Styles
injectGlobal`
  body {
    margin: 0px;
  }
`;
