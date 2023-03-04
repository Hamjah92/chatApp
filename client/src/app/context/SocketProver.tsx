import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";

type Props = {
  children: ReactNode;
  id: string;
};
const SocketContext = createContext<Socket | null>(null);
export const SocketProver = ({ id, children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(SocketContext);
}
