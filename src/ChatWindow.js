import React, { useState, useEffect } from "react";
import "./ChatWindow.css";

const ChatWindow = ({ selectedContact, contacts, setContacts }) => {
  const [newMessage, setNewMessage] = useState("");
  const [localStorageKey, setLocalStorageKey] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setLocalStorageKey(`messages_${selectedContact.id}`);
    }
  }, [selectedContact]);

  const handleSendMessage = (contactId, message) => {
    if (message.trim() === "") {
      return;
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const timestamp = new Date().toLocaleDateString(undefined, options);

    setNewMessage("");

    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId
        ? {
            ...contact,
            messages: [
              ...contact.messages,
              {
                id: contact.messages.length + 1,
                text: message,
                timestamp,
              },
            ],
          }
        : contact
    );
    setContacts(updatedContacts);

    const existingMessages =
      JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const updatedMessages = [
      ...existingMessages,
      { id: existingMessages.length + 1, text: message, timestamp },
    ];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedMessages));
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendClick = () => {
    handleSendMessage(selectedContact.id, newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-window">
      {selectedContact ? (
        <>
          <div className="header">
            <img
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
              src={selectedContact.profileIcon}
              alt="Profile"
            />
            <h2>{selectedContact.name}</h2>
            <p id="icon">
              <i className="bi bi-telephone-fill"></i>
              <i className="bi bi-camera-video"></i>
            </p>
          </div>
          <div className="message-body">
            <div className="message-list">
              {selectedContact.messages.map((message) => (
                <div key={message.id} className="message">
                  <p>{message.text}</p>
                  <small>{message.timestamp}</small>
                </div>
              ))}
            </div>
            <div className="message-info">
              <input
                type="text"
                id="message"
                name="message"
                placeholder="Write Your Messages ...."
                value={newMessage}
                onChange={handleChange}
              />

              <i
                className="bi bi-send btn btn-primary"
                onClick={handleSendClick}
              ></i>
            </div>
          </div>
        </>
      ) : (
        <p id="initial-info">Select a contact to start chatting.</p>
      )}
    </div>
  );
};

export default ChatWindow;
