import { Box, Button, FormControlLabel, FormGroup, IconButton, InputBase, Modal, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}
const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [createChat] = useCreateChat();

  const onClose = () => {
    setError("");
    setName("");
    setIsPrivate(true);
    handleClose();
  }
  return <>
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">Add Chat</Typography>
          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked
                  value={isPrivate}
                  onChange={(event) => setIsPrivate(event.target.checked)} />
              }
              label="private"
            />
          </FormGroup>
          {
            isPrivate ? (
              <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
                <IconButton sx={{ p: "10px" }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            ) : (
              <TextField
                label="Name"
                error={!!error}
                helperText={error}
                onChange={(event) => setName(event.target.value)} />
            )
          }
          <Button onClick={async () => {
            if (name.length == 0) {
              setError("Chat name is required.");
              return;
            }
            try {
              await createChat({
                variables: { createChatInput: { isPrivate, name: name || undefined } }
              });
            } catch (err) {
              setError(UNKNOWN_ERROR_MESSAGE);
            }
            onClose();
          }} variant="outlined">Save</Button>
        </Stack>
      </Box>
    </Modal>
  </>
}

export default ChatListAdd;