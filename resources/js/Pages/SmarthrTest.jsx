// resources/js/Pages/SmarthrTest.jsx
import React from 'react';
import {createTheme, ThemeProvider, Button, HeaderLink} from 'smarthr-ui';
import 'smarthr-ui/smarthr-ui.css';

const theme = createTheme();

const SmarthrTest = () => (
  <ThemeProvider theme={theme}>
    <HeaderLink href="#" className="bg-emerald-500 w-screen">
      ヘルプ
    </HeaderLink>
    <div style={{padding: '2rem'}}>
      <h1>smarthr-ui を Inertia でテスト</h1>
      <Button variant="primary">Hello World</Button>
    </div>
  </ThemeProvider>
);

export default SmarthrTest;
