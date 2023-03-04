import { areArraysEqual } from "@mui/base";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useContacts } from "./ContactProvider";
import { useSocket } from "./SocketProver";

type AddMessageType = {
  recipients: string[];
  text: string;
  sender: string;
};

type MessageType = {
  senderName?: string;
  forMe?: boolean;
  text: string;
  sender: string;
};
type FormattedConverSationType = {
  recipients: Array<{ id: string; name: string }>;
  selected: boolean;
  messages: MessageType[];
};
type ConversationType = {
  recipients: string[];
  selected: boolean;
  messages: MessageType[];
};
type ConversationContextType = {
  conversations: FormattedConverSationType[];
  selectedConversation: FormattedConverSationType;
  createConversation: (recipients: string[]) => void;
  sendMessage: (recipients: string[], text: string) => void;
  handleSelectedConverSation: (index: number) => void;
};

type Props = {
  children: ReactNode;
  userId: string;
};
const ConversationContext = createContext<ConversationContextType | null>(null);

export const useConversations = () => {
  return useContext(ConversationContext);
};
export const ConversationProvider: FC<Props> = ({ children, userId }) => {
  const { contacts } = useContacts()!;
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState<number>(0);
  const [conversations, setConversations] = useLocalStorage(
    "Conversations",
    []
  );
  const socket = useSocket();

  const addMessageToRecipients = useCallback(
    ({ recipients, text, sender }: AddMessageType) => {
      setConversations((prevConversations: ConversationType[]) => {
        let madeChange = false;
        const newMessage = { text, sender };

        const newConversations = prevConversations.map((conversation) => {
          if (areArraysEqual(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });
        if (madeChange) {
          return newConversations;
        } else {
          return [
            ...prevConversations,
            { recipients: recipients, messages: [newMessage] },
          ];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket === null) return;
    socket.on("receive-message", addMessageToRecipients);

    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToRecipients]);
  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: ConversationType[]) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const handleSelectedConverSation = (index: number) => {
    setSelectedConversationIndex(index);
  };

  const sendMessage = (recipients: string[], text: string) => {
    socket?.emit("send-message", { recipients, text });
    addMessageToRecipients({ recipients, text, sender: userId });
  };

  //
  const formattedConversations: FormattedConverSationType[] = (
    conversations as Array<{
      recipients: string[];
      messages: MessageType[];
    }>
  ).map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((msg) => {
      const contact = contacts.find((contact) => {
        return contact.id === msg.sender;
      });
      const forMe = userId === msg.sender;
      const name = (contact && contact.name) || msg.sender;
      return { ...msg, senderName: name, forMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const contextValue = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
    sendMessage,
    handleSelectedConverSation,
  };
  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
};
