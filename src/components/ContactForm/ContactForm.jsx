import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import Button from '../buttons/Button';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = formData;

    if (name.trim() !== '') {
      onAddContact(name, number);
      setFormData({
        name: '',
        number: '',
      });
    }
  };

  const { name, number } = formData;

  return (
    <form className={styles.addContactForm} onSubmit={handleSubmit}>
      <h2>Name</h2>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Z]+(([' \-][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <h2>Number</h2>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <Button className={'mt-16'} type="submit">
        Add Contact
      </Button>
    </form>
  );
};

export default ContactForm;
