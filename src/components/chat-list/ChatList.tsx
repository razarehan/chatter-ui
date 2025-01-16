import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { usePath } from '../../hooks/usePath';

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();
  useEffect(() => {
    const pathSplit = path.split('chats/');
    const chatId = pathSplit[pathSplit.length - 1];
    setSelectedChatId(chatId);
  }, [path]);
  return (
    <>
      <ChatListAdd open={chatListAddVisible} handleClose={() => setChatListAddVisible(false)} />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List sx={{
          maxHeight: '70vh',
          overflow: 'auto',
          width: '100%',
          bgcolor: 'background.paper'
        }}>
          {data?.chats.map(chat => (
            <ChatListItem chat={chat} selected={chat._id === selectedChatId} />
          )).reverse()}
        </List>
      </Stack>
    </>
  );
}