import React from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Auth from './components/auth/Auth';
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Auth />
      </Container>
    </ThemeProvider>
  )
}

export default App;
