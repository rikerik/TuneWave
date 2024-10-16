import React, { useState, useEffect, useRef } from "react";
import "../../styles/ChatWindow.css";
import { FaTimes } from "react-icons/fa";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getUserDetailsFromToken } from "../../Utils/TokenUtil";

const ChatWindow = ({ chatGroup, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null); // Using useRef to hold the stompclient
  const userDetails = getUserDetailsFromToken();
  const username = userDetails ? userDetails.username : "User";

  useEffect(() => {
    stompClient.current = Stomp.over(
      () => new SockJS("http://localhost:8080/ws")
    );
    stompClient.current.connect(
      {},
      () => {
        console.log("Connected to WebSocket");
        onConnected();
      },
      onError
    );

    return () => {
      if (stompClient.current !== null) {
        stompClient.current.disconnect();
        console.log("Disconnected from WebSocket");
      }
    };
  }, [chatGroup]);

  const onConnected = () => {
    console.log(`Connected to chat group: ${chatGroup}`);
    stompClient.current.subscribe(`/topic/${chatGroup}`, onMessageReceived);
    console.log(`Subscribed to topic: /topic/${chatGroup}`);
  };

  const onError = (error) => {
    console.error("WebSocket connection error:", error);
  };

  const onMessageReceived = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("Received message:", receivedMessage);
    setMessages((prevMessages) => {
      if (
        prevMessages.length === 0 ||
        !(
          prevMessages[prevMessages.length - 1].content ===
            receivedMessage.content &&
          prevMessages[prevMessages.length - 1].sender ===
            receivedMessage.sender
        )
      ) {
        return [...prevMessages, receivedMessage];
      }
      return prevMessages;
    });
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    console.log("Attempting to send message:", trimmedMessage);

    if (stompClient.current) {
      if (trimmedMessage) {
        const chatMessage = {
          group: chatGroup,
          sender: username,
          content: trimmedMessage,
        };

        console.log("Sending message:", chatMessage);
        stompClient.current.send(
          "/app/sendMessage",
          {},
          JSON.stringify(chatMessage)
        );
        console.log("Message sent, waiting for response...");

        setMessage(""); // Clear the input field after sending
      } else {
        console.warn("Cannot send empty message:", trimmedMessage);
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>{chatGroup}</span>
        <FaTimes className="close-icon" onClick={() => onClose(chatGroup)} />
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === username ? "message-right" : "message-left"
            }`}
          >
            <p className="message-sender">{msg.sender}</p>
            <p className="message-content">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            console.log("Input value changed:", e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              console.log("Enter key pressed");
              sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            console.log("Send button clicked");
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
