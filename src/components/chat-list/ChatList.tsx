import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';

export default function ChatList() {
  return (
    <Stack>
      <ChatListHeader />
      <Divider />
      <List sx={{
        maxHeight: '80vh',
        overflow: 'auto',
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper'
      }}>
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </List>
    </Stack>
  );
}