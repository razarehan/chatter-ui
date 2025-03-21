import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  let params = useParams<{ _id: string }>();
  const isMobile = window.innerWidth < 900;
  const chatId = params?._id || '';
  const [message, setMessage] = useState("");
  const { data } = useGetChat({ _id: chatId! });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location.pathname, messages]);

  const handleCreateMessage = async () => {
    if (message === "") return;

    await createMessage({ variables: { createMessageInput: { content: message, chatId } } });
    setMessage("");
    scrollToBottom();
  }
  return <>
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1 className="chat-header-text">{data?.chat.name}</h1>
      <Box sx={{ height: "100%", overflow: "auto", padding: "0px 1rem" }}>
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() => fetchMore({ variables: { skip: messages?.messages.length } })}
          hasMore={
            messages && messagesCount ? messages.messages.length < messagesCount : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages?.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() - new Date(messageB.createdAt).getTime()
              ).map(message => (
                <Grid container alignItems="center" marginBottom="1rem">
                  <Grid item xs={1.5} lg={0.5}>
                    <Stack spacing={1} alignItems="center" justifyContent="center">
                      <Avatar sx={{ width: 32, height: 32 }} src={message.user.imageUrl}></Avatar>
                      <Typography variant="caption">{message.user.username.split(' ')[0]}</Typography>
                    </Stack>
                  </Grid>
                  <Grid xs={0.3} lg={0.1}></Grid>
                  <Grid item xs={10.2} lg={11.4}>
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography sx={{ padding: "0.9rem" }}>{message.content}</Typography>
                      </Paper>
                      <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                        {new Date(message.createdAt).toLocaleTimeString()} - {" "}
                        {new Date(message.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))
          }
        </InfiniteScroll>
        <div ref={divRef}></div>
      </Box>
      <Paper sx={{
        p: '2px 4px',
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center',
        width: '100%',
        margin: "1rem 0px 0px"
      }}>
        <InputBase
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          sx={{ ml: 1, flex: 1, width: '100%' }}
          placeholder="Message"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: '10px' }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  </>
}
export default Chat;