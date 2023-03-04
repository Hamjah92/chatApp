import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { FC, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useConversations } from "../../context/ConversationProvider";
import { Typography } from "@mui/material";
type Props = {};

export const OpenConversation: FC<Props> = () => {
  const textRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const lastMessageRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { sendMessage, selectedConversation } = useConversations()!;
  const recipientsIds = selectedConversation.recipients.map((r) => r.id);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage(recipientsIds, textRef.current.value);
    textRef.current.value = "";
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow:1}}>
      <Box sx={{ flexGrow: 1 }} overflow="auto">
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "start",
            flexDirection: "column",
            p: 3,
            overflow: "auto",
          }}
        >
          {selectedConversation.messages.map((msg, index) => {
            const bgColor = msg.forMe ? "blue" : "grey";
            const textColor = msg.forMe ? "white" : "black";
            const alignText = msg.forMe ? "end" : "";
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <Box
                ref={lastMessage ? lastMessageRef : null}
                key={index}
                alignSelf={alignText}
              >
                <Typography
                  variant="body2"
                  sx={{
                    p: 1,
                    backgroundColor: bgColor,
                    color: textColor,
                    borderRadius: "10px",
                  }}
                  component="p"
                  color={msg.forMe ? "white" : "black"}
                >
                  {msg.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textAlign: "right" }}
                  component="p"
                >
                  {msg.forMe ? "You" : msg.senderName || msg.sender}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              m: 1,
              width: "100%",
          
              bottom: 0,
            }}
            variant="standard"
          >
            <InputLabel>Password</InputLabel>
            <Input
              inputRef={textRef}
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};
