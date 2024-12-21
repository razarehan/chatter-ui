import { AddCircle } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton } from "@mui/material";

interface ChatListHeaderProps {
  handleAddChat: () => void;
}
const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar >
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ChatListHeader;