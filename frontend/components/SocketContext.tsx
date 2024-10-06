"use client";

import React, { createContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO client using the correct Socket.IO client library
    const socket = io("http://localhost:8080", {
      transports: ["websocket"],
    }); // Adjust the URL as needed for your backend
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to server");
      setSocket(socket);
    });

    socket.on("connected", (data: any) => {
      console.log("Server response:", data);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
