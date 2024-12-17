import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from './Logo';
import MobileNavigation from './mobile/MobileNavigation';
import MobileLogo from './mobile/MobileLogo';
import Navigation from './Navigation';
import Settings from './Settings';

const pages: string[] = [];

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MobileNavigation pages={pages} />
          <MobileLogo />
          <Navigation pages={pages} />
          <Settings />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
