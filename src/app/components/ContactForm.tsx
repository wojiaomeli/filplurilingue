"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-title">Nous contacter</h2>
      <p>Si vous souhaitez nous contacter, merci de remplir ce formulaire.</p>
      <form className="contact-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Adresse e-mail"
            className="contact-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Sujet"
            className="contact-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Message"
            rows={4}
            className="contact-textarea"
            required
          ></textarea>
        </div>
        <button type="submit" className="contact-submit-button">Envoyer</button>
      </form>
    </div>
  );
};

export default ContactForm;
