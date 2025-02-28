import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routes';
import { ApolloProvider } from '@apollo/client';
import client from './constants/apollo-client';
import Guard from './components/auth/Guard';
import Header from './components/header/Header';
import Snackbar from './components/snackbar/Snackbar';
import Grid from '@mui/material/Grid';
import ChatList from './components/chat-list/ChatList';
import { usePath } from './hooks/usePath';
import { useTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});
function App() {
  const { path } = usePath();
  const isMobile = window.innerWidth < 900;
  const showChatList = path === '/' || (path.includes('chats') && !isMobile);
  const theme = useTheme();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className='main-container'>
          <Header />
          <Guard>
            <Container className='padd0' maxWidth="xl" sx={{ height: 'calc(100% - 70px)' }}>
              {showChatList ? (
                <Grid className='pt-n-pb-0' container sx={{
                  margin: '0px',
                  width: '100%',
                  padding: {
                    xs: theme.spacing(0), // Padding for mobile (xs breakpoint)
                    sm: theme.spacing(4), // Padding for tablets and above
                  },
                }}>
                  <Grid xs={12} md={5} lg={4} xl={3}>
                    <ChatList />
                  </Grid>
                  {!isMobile && <Grid xs={0} md={0.3} lg={0.3} xl={0.3}></Grid>}
                  {!isMobile && <Grid xs={12} md={6.7} lg={7.7} xl={8.7} sx={{
                    padding: {
                      xs: theme.spacing(2),
                      sm: theme.spacing(0),
                    }
                  }}>
                    <Routes />
                  </Grid>}
                </Grid>
              ) : <Routes />}
            </Container>
          </Guard>
        </div>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  )
}

const Routes = () => {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
