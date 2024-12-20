import { AddCircle } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton } from "@mui/material";

const ChatListHeader = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar >
        <IconButton size="large" edge="start">
          <AddCircle/>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ChatListHeader;