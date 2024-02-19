import React, { useState, useEffect } from "react";
import "./ContactList.css";

const ContactList = ({ contacts, onContactClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const newFilteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredContacts(newFilteredContacts);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="contact-list">
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Contacts
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="d-flex"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-secondary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="contact-box">
        {filteredContacts.map((contact) => (
          <div
            className="contacts"
            key={contact.id}
            onClick={() => onContactClick(contact)}
          >
            <img
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                margin: "1% 1%",
              }}
              src={contact.profileIcon}
              alt="Profile"
            />
            <div className="info">
              <h5>{contact.name}</h5>
              <p>
                {contact.messages[contact.messages.length - 1].text.length > 15
                  ? contact.messages[contact.messages.length - 1].text.substr(
                      0,
                      15
                    ) + "..."
                  : contact.messages[contact.messages.length - 1].text.substr(
                      0,
                      15
                    )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
