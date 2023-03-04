import { ContactProvider } from "./context/ContactProvider";
import { ConversationProvider } from "./context/ConversationProvider";
import { SocketProver } from "./context/SocketProver";
import { Dashboard } from "./module/auth/Dashboard";
import { Login } from "./module/auth/Login";

const initialValues = { userId: "" };

const getDefaultValue = (key: string, initialValue: any) => {
  const localValue = localStorage.getItem(key);
  return localValue != null ? JSON.parse(localValue) : initialValue;
};

const defaultValues = getDefaultValue("loginForm", initialValues);

function App() {
  return (
    <>
      {defaultValues.userId ? (
        <SocketProver id={defaultValues.userId}>
          <ContactProvider>
            <ConversationProvider userId={defaultValues.userId}>
              <Dashboard userId={defaultValues.userId} />
            </ConversationProvider>
          </ContactProvider>
        </SocketProver>
      ) : (
        <Login defaultValues={defaultValues} />
      )}
    </>
  );
}

export default App;
