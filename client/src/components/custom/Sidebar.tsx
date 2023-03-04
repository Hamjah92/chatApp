import { Box, Tab, Tabs, Typography, Button } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { useLocalStorage } from "../../app/hooks/useLocalStorage";
import { Contacts } from "../../app/module/chat/Contacts";
import { Conversations } from "../../app/module/chat/Conversations";
import { BasicModal } from "../modal/BasicModal";
import { NewContactModal } from "../modal/NewContactModal";
import { NewConversationModal } from "../modal/NewConversationModal";

type Props = {
  userId: string;
};

type TabPanelProps = {
  children: ReactNode;
  value: string;
  [x: string]: any;
};
export const Sidebar: FC<Props> = ({ userId }) => {
  const [tabValue, setTabValue] = useLocalStorage("openTab", "conversations");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const TabPanels: FC<TabPanelProps> = ({ children, value, ...others }) => {
    return <>{tabValue === value ? children : null}</>;
  };
  return (
    <>
      <Box
        sx={{ border: "1px solid grey", p: 2, display:"flex", flexDirection:"column" }}
      >
        <Box
        flexGrow={1}
          display={"flex"}
          justifyContent="space-between"
          flexDirection={"column"}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="conversations" label="Conversations" />
            <Tab value="contacts" label="Contacts" />
          </Tabs>
          <Box marginBottom={"auto"}>
            <TabPanels value="conversations">
              <Conversations />
            </TabPanels>
            <TabPanels value="contacts">
              <Contacts />
            </TabPanels>
          </Box>
        </Box>
        <Box marginTop={"auto"}>
          <Typography variant="body1" component="p">
            Your Id : {userId}
          </Typography>
          <Button onClick={handleOpen} variant="contained" fullWidth>
            New {tabValue}
          </Button>
        </Box>
      </Box>
      <BasicModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        {tabValue === "contacts" ? (
          <NewContactModal handleClose={handleClose} />
        ) : (
          <NewConversationModal handleClose={handleClose} />
        )}
      </BasicModal>
    </>
  );
};
