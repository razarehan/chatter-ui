import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
const Chat = () => {
  let params = useParams<{ _id: string }>();
  const chatId = params?._id || '';
  const [message, setMessage] = useState("");
  const { data } = useGetChat({ _id: chatId! });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(()=>{
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  const handleCreateMessage = async () => {
    await createMessage({ variables: { createMessageInput: { content: message, chatId } } });
    setMessage("");
    scrollToBottom();
  }
  return <>
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ height: "70vh", overflow: "auto" }}>
        {messages?.messages.map(message => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid item xs={3} md={1}>
              <Avatar src="" sx={{ width: 52, height: 52 }}></Avatar>
            </Grid>
            <Grid item xs={9} md={11}>
              <Stack>
                <Paper sx={{ width: "fit-content" }}>
                  <Typography sx={{ padding: "0.9rem" }}>{message.content}</Typography>
                </Paper>
                <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper sx={{
        p: '2px 4px',
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center',
        width: '100%'
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