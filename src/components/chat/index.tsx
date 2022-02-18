import React, { useRef, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

import { useGetChatTokenQuery } from "src/generated/graphql";
import { useToken } from "src/token";

const socketUrl = process.env.NEXT_PUBLIC_CHAT_URL;

const chatLimit = 140;

type ChatMessage = {
  id: number;
  message: string;
  from: string;
};
type Hello = {
  chat: ChatMessage[];
};

export function Chat(): JSX.Element {
  const { data } = useGetChatTokenQuery();
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isChatFocused, setChatFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (socketRef.current) {
      return;
    }
    if (!socketUrl || !data?.chat?.token) {
      return;
    }

    socketRef.current = io(socketUrl, {
      withCredentials: true,
      auth: {
        token: data.chat.token,
      },
    });

    socketRef.current.on("hello", (data: Hello) => {
      setChat(data.chat);
    });

    socketRef.current.on("chat", (data: ChatMessage) => {
      console.log("Got chat event!", data);
      setChat((oldChat) => [data, ...oldChat]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = undefined;
      }
    };
  }, [data?.chat?.token]);

  function cleanChatMessage(str: string): string {
    return str.trim();
  }
  const cleanMessage = cleanChatMessage(message);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (cleanChatMessage(value).length <= chatLimit) {
      setMessage(value);
    }
  }

  async function checkForEnter(e: React.KeyboardEvent) {
    if (e.key !== "Enter" || !socketRef.current) {
      return;
    }

    socketRef.current.emit(
      "chat",
      {
        message,
      },
      (data: ChatMessage) => {
        console.log("Got a reply!", data);
        setChat((oldChat) => [data, ...oldChat]);
      }
    );
    setMessage("");
  }

  return (
    <React.Fragment>
      <TextField
        fullWidth
        disabled={!socketRef.current?.connected}
        value={message}
        name="Chat input"
        label={
          isChatFocused
            ? `Max message: ${cleanMessage.length}/${chatLimit}`
            : "Type here..."
        }
        placeholder="Type here..."
        onChange={handleChange}
        onFocus={() => setChatFocus(true)}
        onBlur={() => setChatFocus(false)}
        autoComplete="off"
        onKeyPress={checkForEnter}
      />
      {chat.map((chatMessage) => (
        <div key={chatMessage.id}>
          {chatMessage.from}: {chatMessage.message}
        </div>
      ))}
      {/* <Button variant="contained">Send</Button> */}
      <br />
    </React.Fragment>
  );
}
