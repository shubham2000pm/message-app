import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";
import "./contactsData.json";
import "./App.css";

const App = () => {
  const data = require("./contactsData.json");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    setContacts(data.contacts);
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <>
      <div className="app-container">
        <ContactList contacts={contacts} onContactClick={handleContactClick} />
        <ChatWindow
          selectedContact={selectedContact}
          contacts={contacts}
          setContacts={setContacts}
        />
      </div>
    </>
  );
};

export default App;
