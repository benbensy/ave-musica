import { useContext } from "react";
import { SocketContext } from "../context/socket-io";
import { Socket } from "socket.io-client";

export function useSocket() {
    return useContext(SocketContext) as Socket
}
