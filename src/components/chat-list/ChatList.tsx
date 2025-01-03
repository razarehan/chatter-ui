import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const {data} = useGetChats();
  
  return (
    <>
      <ChatListAdd open={chatListAddVisible} handleClose={() => setChatListAddVisible(false)} />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List sx={{
          maxHeight: '80vh',
          overflow: 'auto',
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}>
          {data?.chats.map(chat=>(
            <ChatListItem name={chat.name} />
          ))}
        </List>
      </Stack>
    </>
  );
}