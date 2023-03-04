import { createContext, FC, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ContextContextType = {
  contacts: Array<{ id: string; name: string }>;
  createContact: (id: string, name: string) => void;
};

type Props = {
  children: ReactNode;
};
const ContactContext = createContext<ContextContextType | null>(null);

export const useContacts = () => {
  return useContext(ContactContext);
};
export const ContactProvider: FC<Props> = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage(
    "contacts",
    [] as Array<{ id: string; name: string }>
  );
  const createContact = (id: string, name: string) => {
    setContacts((prev: any) => {
      return [...prev, { id, name }];
    });
  };
  const contextValue = {
    contacts,
    createContact,
  };
  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
