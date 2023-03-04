import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { MutableRefObject, useRef } from "react";
import { useContacts } from "../../app/context/ContactProvider";

type Props = {
  handleClose: () => void;
};

export const NewContactModal = ({ handleClose }: Props) => {
  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;

  const { createContact } = useContacts()!;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    handleClose();
  };

  return (
    <Box>
      <Typography variant="h6" component={"h6"}>
        Add Contact
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2} marginTop={2}>
          <TextField
            variant="outlined"
            label="User Id"
            inputRef={idRef}
          ></TextField>
          <TextField
            variant="outlined"
            label="Name"
            inputRef={nameRef}
          ></TextField>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
