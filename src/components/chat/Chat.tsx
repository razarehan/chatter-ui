import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";
const Chat = () => {
  let params = useParams<{ _id: string }>();
  const chatId = params?._id || '';
  const [message, setMessage] = useState("");
  const { data } = useGetChat({ _id: chatId! });
  const [createMessage] = useCreateMessage();

  return <>
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1>{data?.chat.name}</h1>
      <Paper sx={{
        p: '2px 4px',
        display: 'flex',
        justifySelf: 'flex-end',
        alignItems: 'center',
        width: '100%'
      }}>
        <InputBase onChange={(event) => setMessage(event.target.value)} value={message} sx={{ ml: 1, flex: 1, width: '100%' }} placeholder="Message"></InputBase>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={() => createMessage({ variables: { createMessageInput: { content: message, chatId } } })}
          color="primary"
          sx={{ p: '10px' }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  </>
}
export default Chat;