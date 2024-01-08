import React from 'react';
import styles from './ContactList.module.css';
import ContactListItem from './ContactListItem';

const ContactList = ({ list, onDeleteContact }) => {
  console.log('Rendering ContactList with contacts:', list);

  return (
    <div className={`${styles.contactsList}`}>
      {list.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
