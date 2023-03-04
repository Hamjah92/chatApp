import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useContacts } from "../../context/ContactProvider";
import { v4 as uuidv4 } from "uuid";
import { BackgroundLetterAvatars } from "../../../components/custom/BackgroundLetterAvatars";

export function Contacts() {
  const { contacts } = useContacts()!;

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {contacts.map((content) => {
        return (
          <ListItem key={uuidv4()} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <BackgroundLetterAvatars name={content.name} />
              </ListItemAvatar>
              <ListItemText id={uuidv4()} primary={`${content.name.toUpperCase()}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
