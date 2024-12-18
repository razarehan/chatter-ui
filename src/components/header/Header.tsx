import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from './Logo';
import MobileNavigation from './mobile/MobileNavigation';
import MobileLogo from './mobile/MobileLogo';
import Navigation from './Navigation';
import Settings from './Settings';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVar } from '../../constants/authenticated';
import { Page } from '../../interfaces/page.interface';

const pages: Page[] = [
  {
    title: "Home",
    path: "/"
  }
];
const unauthenticatedPages: Page[] = [
  {
    title: "Login",
    path: "/login"
  },
  {
    title: "Signup",
    path: "/signup"
  }
]
const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MobileNavigation pages={authenticated ? pages: unauthenticatedPages} />
          <MobileLogo />
          <Navigation pages={authenticated ? pages: unauthenticatedPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
