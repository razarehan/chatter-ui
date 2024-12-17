import { Typography } from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import router from "../Routes";
const Logo = () => {
  return <>
    <QuestionAnswerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    <Typography
      variant="h6"
      noWrap
      component="a"
      onClick={() => router.navigate("/")}
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      CHATTER
    </Typography>
  </>
}
export default Logo;