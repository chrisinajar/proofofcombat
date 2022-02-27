import React, { useRef, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { emojify } from "node-emoji";
import { timeAgo } from "short-time-ago";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { InventoryItem, useGetChatTokenQuery } from "src/generated/graphql";
import { useToken } from "src/token";
import { itemDisplayName } from "src/helpers";

const socketUrl = process.env.NEXT_PUBLIC_CHAT_URL;

const chatLimit = 140;

type ChatMessage = {
  id: number;
  message: string;
  from: string;
  time?: number;
  color?: string;
  variant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline";
};
type SystemMessage = {
  color: "success" | "primary" | "secondary" | "error";
  message: string;
};
type Notification = {
  type: "drop" | "quest";
  message: string;
  item?: InventoryItem;
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

    socketRef.current.on("notification", (data: Notification) => {
      if (data.item) {
        data.message = data.message.replace(
          "{{item}}",
          itemDisplayName(data.item)
        );
      }

      console.log(data.message);
      setChat((oldChat) => [
        {
          id: Math.random(),
          time: Date.now() / 1000,
          message: "",
          from: data.message,
          color: data.type === "drop" ? "error" : "secondary",
          variant: "body1",
        },
        ...oldChat,
      ]);
    });
    socketRef.current.on("system-message", (data: SystemMessage) => {
      setChat((oldChat) => [
        {
          id: Math.random(),
          time: Date.now() / 1000,
          message: data.message,
          from: "",
          color: data.color,
          variant: "h6",
        },
        ...oldChat,
      ]);
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
      <Box
        sx={{
          padding: 1,
          minHeight: "600px",
          bgcolor: "primary.light",
        }}
      >
        {chat.map((chatMessage) => (
          <Typography
            variant={chatMessage.variant || "body1"}
            key={chatMessage.id}
            sx={{ color: `${chatMessage.color || "text"}.dark` }}
          >
            {chatMessage.time && (
              <Typography variant="caption">
                ({timeAgo(new Date(chatMessage.time * 1000))})&nbsp;
              </Typography>
            )}
            <b>{chatMessage.from}</b> {emojify(chatMessage.message)}
          </Typography>
        ))}
        {/* <Button variant="contained">Send</Button> */}
      </Box>
      <br />
    </React.Fragment>
  );
}
