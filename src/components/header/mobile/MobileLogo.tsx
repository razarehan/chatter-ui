import { Typography } from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import router from "../../Routes";

const MobileLogo = () => {
  return <>
    <QuestionAnswerIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    <Typography
      variant="h5"
      noWrap
      component="a"
      onClick={() => {
        window.location.assign("/");
        router.navigate("/");
      }}
      sx={{
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
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
export default MobileLogo;