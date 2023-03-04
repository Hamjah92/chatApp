import { Stack } from "@mui/material";
import { Sidebar } from "../../../components/custom/Sidebar";
import { useConversations } from "../../context/ConversationProvider";
import { OpenConversation } from "../chat/OpenConversation";

type Props = {
  userId: string;
};

export const Dashboard = ({ userId }: Props) => {
  const { selectedConversation } = useConversations()!;
  return (
    <Stack flexDirection={"row"}>
      <Sidebar userId={userId} />
      {selectedConversation && <OpenConversation />}
    </Stack>
  );
};
