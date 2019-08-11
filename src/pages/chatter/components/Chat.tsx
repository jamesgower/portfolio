import React, { Component } from "react";
import io from "socket.io-client";
import uuid from "uuid/v4";
import Message from "./Message";
import SideBar from "./SideBar";
import "../scss/chatter.scss";
import SendMessage from "./SendMessage";
import { ChatProps, ChatState } from "../interfaces/chat.i";

class Chat extends Component<ChatProps, ChatState> {
  public readonly state = {
    messages: [],
    socket: null,
  };

  public componentWillMount(): void {
    const endpoint =
      process.env.NODE_ENV === "production"
        ? "https://www.james-gower.dev"
        : "http://localhost:5000";

    const socket = io(endpoint);
    const { params } = this.props;

    socket.on("connect", (): void => {
      socket.emit("join", params, (err): void => {
        if (err) {
          alert(err);
        } else {
          console.log("No error");
        }
      });
    });
    this.setState({ socket });
  }

  public componentDidMount(): void {
    const { socket } = this.state;
    const {
      params: { room },
    } = this.props;
    document.title = `${room} | Chatter`;

    socket.on("newMessage", (message): void => {
      const { messages } = this.state;
      messages.push({ type: "message", message });
      this.setState({ messages });
      this.scrollToBottom();
    });

    socket.on("newMessageSent", (message): void => {
      const { messages } = this.state;
      messages.push({ type: "message-sent", message });
      this.setState({ messages });

      this.scrollToBottom();
    });

    socket.on("newMessageAdmin", (message): void => {
      const { messages } = this.state;
      messages.push({ type: "message-admin", message });
      this.setState({ messages });
      this.scrollToBottom();
    });

    socket.on("newLocationMessage", (message): void => {
      const { messages } = this.state;
      messages.push({ type: "message", location: true, message });
      this.setState({
        messages,
      });
      this.scrollToBottom();
    });

    socket.on("newLocationMessageSent", (message): void => {
      const { messages } = this.state;
      messages.push({ type: "message-sent", location: true, message });
      this.setState({
        messages,
      });
      this.scrollToBottom();
    });
  }

  public componentWillUnmount(): void {
    const { socket } = this.state;
    socket.on("disconnect", (): void => {
      console.log("Disconnected from server");
    });
  }

  public scrollToBottom = (): void => {};

  public render(): JSX.Element {
    const { messages, socket } = this.state;

    return (
      <div className="chat__container">
        <SideBar socket={socket} />
        <div className="chat__main">
          <div id="messages" className="chat__messages">
            {messages.map(
              (message): JSX.Element => (
                <Message {...message} key={uuid()} />
              ),
            )}
          </div>
          <SendMessage socket={socket} />
        </div>
      </div>
    );
  }
}

export default Chat;
