// ChatWindow.js
import React from "react";
import "../../styles/ChatWindow.css";
import { FaTimes } from "react-icons/fa";

const ChatWindow = ({ chatGroup, onClose }) => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>{chatGroup}</span>
        <FaTimes className="close-icon" onClick={() => onClose(chatGroup)} />
      </div>
      <div className="chat-body">
        <p>Chat content for {chatGroup}...</p>
      </div>
      <div className="chat-footer">
        <input type="text" placeholder="Type a message..." />
      </div>
    </div>
  );
};

export default ChatWindow;
