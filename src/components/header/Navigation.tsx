import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Page } from '../../interfaces/page.interface';
import router from '../Routes';

interface NavigationProps {
  pages: Page[];
}

const Navigation = ({ pages }: NavigationProps) => {
  return <>
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page, index) => (
        <Button
          key={index}
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={()=>router.navigate(page.path)}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  </>
}
export default Navigation;