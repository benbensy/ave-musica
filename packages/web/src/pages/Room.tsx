import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../hooks/socket";
import { Button, Input, Paper, Typography } from "@mui/material";

export default function Room() {
  const params = useParams();
  const socket = useSocket();
  const [messageReceive, setMessageReceive] = useState('')
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();
    socket.on('messageReceive', setMessageReceive)

    return () => {
      socket.disconnect();
    };
  }, []);

  function send() {
    socket.emit("events", message);
  }

  return (
    <Paper>
      <Paper sx={{minHeight: 100}}>收到消息：{messageReceive}</Paper>

      <Typography>Room ID: {params.id}</Typography>
      <Input
        value={message}
        onChange={(ev) => {
          setMessage(ev.target.value);
        }}
        multiline
        placeholder="消息"
      />
      <Button onClick={send}>发送消息</Button>
    </Paper>
  );
}
