import React, { useRef, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { emojify } from "node-emoji";
import { timeAgo } from "short-time-ago";
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import MessageIcon from "@mui/icons-material/Message";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CancelIcon from "@mui/icons-material/Cancel";

import { InventoryItem, useGetChatTokenQuery } from "src/generated/graphql";
import { useHero } from "src/hooks/use-hero";
import { useToken } from "src/token";
import { itemDisplayName } from "src/helpers";

import { Trade } from "./trade";

const socketUrl = process.env.NEXT_PUBLIC_CHAT_URL;

const chatLimit = 140;

type ChatMessage = {
  id: number;
  message: string;
  from: string;
  to?: string;
  time?: number;
  color?: string;
  type: "chat" | "private" | "notification" | "system" | "drop" | "quest";
  heroId?: string;
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

type MessageTabsType = {
  [x in string]: {
    type: "private" | "built-in";
    heroId?: string;
  };
};

export function Chat(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const hero = useHero();
  const { data } = useGetChatTokenQuery();
  const [tradeMode, setTradeMode] = useState<boolean>(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isChatFocused, setChatFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [messageTabs, setMessageTabs] = useState<MessageTabsType>({
    all: { type: "built-in" },
    chat: { type: "built-in" },
    notifications: { type: "built-in" },
  });

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

      if (data.type === "drop") {
        if (data.item) {
          enqueueSnackbar(`You found ${itemDisplayName(data.item)}`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        }
      } else {
        enqueueSnackbar(data.message, {
          variant: "info",
        });
      }

      setChat((oldChat) => [
        {
          type: data.type ?? "notification",
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
      enqueueSnackbar(data.message, {
        variant: "warning",
      });
      setChat((oldChat) => [
        {
          type: "system",
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

  function checkForEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSendChat();
      return;
    }
  }
  async function handleSendChat() {
    if (!socketRef.current) {
      return;
    }
    const tabData = messageTabs[currentTab];

    if (tabData.type === "private") {
      socketRef.current.emit(
        "private-chat",
        {
          to: tabData.heroId,
          message,
        },
        (data: ChatMessage) => {
          console.log("Got a confirmation!", data);
          setChat((oldChat) => [data, ...oldChat]);
        }
      );
      setMessage("");
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

  function handleWhisper(heroName: string, heroId: string) {
    if (heroId === hero?.id) {
      return;
    }
    console.log("Trying to whisper", heroName, heroId.substr(0, 4));
    setMessageTabs((tabs) => ({
      ...tabs,
      [heroName]: {
        type: "private",
        heroId,
      },
    }));
    setCurrentTab(heroName);
  }

  function handleChangeTab(event: React.SyntheticEvent, newTab: string) {
    if (tradeMode) {
      setTradeMode(false);
    }
    setCurrentTab(newTab);
  }

  const filteredChat = chat.filter((entry) => {
    if (currentTab === "all") {
      return true;
    }
    if (currentTab === "chat") {
      return (
        entry.type === "chat" ||
        entry.type === "private" ||
        entry.type === "system"
      );
    }
    if (currentTab === "notifications") {
      return (
        entry.type === "notification" ||
        entry.type === "drop" ||
        entry.type === "quest" ||
        entry.type === "system"
      );
    }
    const tabData = messageTabs[currentTab];
    // bad tab, just show all
    if (!tabData) {
      return true;
    }
    if (tabData.type === "private") {
      return (
        entry.type === "private" &&
        (entry.heroId === tabData.heroId || entry.to === tabData.heroId)
      );
    }
    return false;
  });

  const chatLabel = isChatFocused
    ? `Max message: ${chatLimit - cleanMessage.length}/${chatLimit}`
    : "Type here...";

  return (
    <React.Fragment>
      <TabContext value={currentTab}>
        <TabList
          onChange={handleChangeTab}
          aria-label="navigation tabs"
          variant="scrollable"
        >
          {Object.keys(messageTabs).map((name) => (
            <Tab label={name} value={name} key={name} />
          ))}
        </TabList>
      </TabContext>
      {currentTab !== "notifications" && (
        <FormControl sx={{ marginTop: 1 }} fullWidth variant="outlined">
          <InputLabel htmlFor="chat-input">{chatLabel}</InputLabel>
          <OutlinedInput
            disabled={!socketRef.current?.connected}
            value={message}
            id="chat-input"
            name="Chat input"
            label={chatLabel}
            placeholder="Type here..."
            onChange={handleChange}
            onFocus={() => setChatFocus(true)}
            onBlur={() => setChatFocus(false)}
            autoComplete="off"
            onKeyPress={checkForEnter}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Send message">
                  <IconButton aria-label="send chat" onClick={handleSendChat}>
                    <MessageIcon />
                  </IconButton>
                </Tooltip>
                {messageTabs[currentTab]?.type === "private" && (
                  <Tooltip
                    title={tradeMode ? "Cancel trade" : "Trade with player"}
                  >
                    <IconButton onClick={() => setTradeMode(!tradeMode)}>
                      {tradeMode && <CancelIcon />}
                      {!tradeMode && <CompareArrowsIcon />}
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      )}
      {tradeMode && hero && messageTabs[currentTab]?.heroId && (
        <Trade hero={hero} to={messageTabs[currentTab].heroId ?? ""} />
      )}
      <Box
        sx={{
          padding: 1,
          minHeight: "600px",
          bgcolor: "background.paper",
        }}
      >
        {filteredChat.map((chatMessage) => (
          <Typography
            variant={chatMessage.variant || "body1"}
            key={chatMessage.id}
            sx={{
              color: `${
                chatMessage.type === "private"
                  ? "secondary"
                  : chatMessage.color || "text"
              }.main`,
            }}
          >
            {chatMessage.time && (
              <Typography variant="caption">
                ({timeAgo(new Date(chatMessage.time * 1000))})&nbsp;
              </Typography>
            )}
            {chatMessage.heroId && (
              <Button
                onClick={() => {
                  if (chatMessage.heroId) {
                    handleWhisper(chatMessage.from, chatMessage.heroId);
                  }
                }}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 1,
                  paddingRight: 0.5,
                  margin: 0,
                }}
              >
                <b>{chatMessage.from}:</b>
              </Button>
            )}
            {!chatMessage.heroId && <b>{chatMessage.from}</b>}{" "}
            {emojify(chatMessage.message)}
          </Typography>
        ))}
        {/* <Button variant="contained">Send</Button> */}
      </Box>
      <br />
    </React.Fragment>
  );
}
