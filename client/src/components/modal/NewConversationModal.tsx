import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useContacts } from "../../app/context/ContactProvider";
import { BackgroundLetterAvatars } from "../custom/BackgroundLetterAvatars";
import { useConversations } from "../../app/context/ConversationProvider";

type Props = {
  handleClose: () => void;
};
export const NewConversationModal: FC<Props> = ({ handleClose }) => {
  const { contacts } = useContacts()!;
  const { createConversation } = useConversations()!;
  const [selectedContactsIds, setSelectedContactsIds] = useState(
    [] as string[]
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createConversation(selectedContactsIds);
    handleClose();
  };

  const handleClick = (contactId: string) => {
    setSelectedContactsIds((prev) => {
      if (selectedContactsIds.includes(contactId)) {
        const contactWith = selectedContactsIds.filter((id) => {
          return id !== contactId;
        });
        return [...contactWith];
      } else {
        return [...prev, contactId];
      }
    });
  };

  return (
    <Box>
      <Typography variant="h6" component={"h6"}>
        Add Contact
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2} marginTop={2}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {contacts.map((content) => {
              return (
                <ListItem
                  key={content.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      id={content.id}
                      checked={selectedContactsIds.includes(content.id)}
                    />
                  }
                  value={content.id}
                  onClick={() => handleClick(content.id)}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <BackgroundLetterAvatars name={content.name} />
                    </ListItemAvatar>
                    <ListItemText primary={`${content.name.toUpperCase()}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Button type="submit" variant="contained">
            Add Conversation
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
