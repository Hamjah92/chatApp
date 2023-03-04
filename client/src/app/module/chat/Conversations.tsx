import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useConversations } from "../../context/ConversationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";

type Props = {};

export const Conversations: FC<Props> = () => {
  const {
    conversations,
    handleSelectedConverSation,
  } = useConversations()!;
  return (
    <Stack direction="column" justifyContent="center">
      <List>
        {conversations.map((conversation, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => handleSelectedConverSation(index)}
                selected={conversation.selected}
              >
                <ListItemText
                  primary={conversation.recipients
                    .map((r) => r.name)
                    .join(", ")}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};
