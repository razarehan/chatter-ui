import ChatListItem from './chat-list-item/ChatListItem';
import { Box, Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { usePath } from '../../hooks/usePath';
import { useMessageCreated } from '../../hooks/useMessageCreated';
import { PAGE_SIZE } from '../../constants/page-size';
import InfiniteScroll from 'react-infinite-scroller';
import { useCountChats } from '../../hooks/useCountChats';

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE
  });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    countChats();
  }, [countChats]);

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
        <Box sx={{
          maxHeight: '100%',
          overflow: 'auto',
          width: '100%',
          bgcolor: 'background.paper'
        }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  skip: data?.chats.length ?? 0,
                }
              })
            }
            hasMore={data?.chats && chatsCount ? data.chats.length < chatsCount : false}
            useWindow={false}
          >
            {
              data?.chats && [...data.chats].sort((chatA, chatB) => {
                if (!chatA.latestMessage)
                  return -1;
                return (
                  new Date(chatA.latestMessage?.createdAt).getTime() -
                  new Date(chatB.latestMessage?.createdAt).getTime()
                )
              }).map(chat => (
                <ChatListItem key={chat._id} chat={chat} selected={chat._id === selectedChatId} />
              )).reverse()
            }
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}