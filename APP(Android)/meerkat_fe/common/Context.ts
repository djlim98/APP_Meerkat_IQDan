
import { createContext } from "react";
import { io } from "socket.io-client";
import { getEmptySocketIO } from "../hooks/useSocketIO";
export const LoginContext = createContext({
    checkIfLoggedIn: () => {},
    isNotLoggedIn: false,
});

export const SocketContext = createContext({
    isSocketConnected: false,
    socket: getEmptySocketIO()
});