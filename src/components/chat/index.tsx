import React, { useRef } from "react";
import { io, Socket } from "socket.io-client";

import { useGetChatTokenQuery } from "src/generated/graphql";
import { useToken } from "src/token";

const socketUrl = process.env.NEXT_PUBLIC_CHAT_URL;

export function Chat(): JSX.Element {
  const { data } = useGetChatTokenQuery();

  const socketRef = useRef<Socket>();

  if (socketUrl && !socketRef.current && data?.chat?.token) {
    socketRef.current = io(socketUrl, {
      withCredentials: true,
      auth: {
        token: data.chat.token,
      },
    });
  }

  console.log(socketRef.current);

  return (
    <React.Fragment>chat is basically done though seriously</React.Fragment>
  );
}
