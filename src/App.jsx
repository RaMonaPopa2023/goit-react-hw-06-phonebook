import React, { useEffect } from 'react';
import styles from './components/ContactForm/ContactForm.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from './redux/slices/filterSlice';
import {
  addContact,
  deleteContact,
  selectContacts,
} from './redux/slices/contactsSlice';
import { nanoid } from 'nanoid';

const CONTACT_KEY = 'contact';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    const data = localStorage.getItem(CONTACT_KEY);

    try {
      if (data) {
        const parsedData = JSON.parse(data);
        dispatch(addContact(parsedData));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const isNameAlreadyExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameAlreadyExist) {
      alert(`Contact with name ${name} already exists!`);
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
    }
  };

  const handleSearchChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.addContactContainer}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleSearchChange} />
      <ContactList
        list={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;

// const App = () => {
//   const { contacts, filter } = useSelector(state => ({
//     contacts: state.contacts,
//     filter: state.filter,
//   }));
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const data = localStorage.getItem(CONTACT_KEY);

//     console.log('ContactForm was mounted');
//     console.log('Parsed data:', data);

//     try {
//       if (data) {
//         const parsedData = JSON.parse(data);
//         console.log('Parsed data:', parsedData);

//         if (Array.isArray(parsedData)) {
//           dispatch(addContact(parsedData)); // Use the correct action type and payload
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     console.log('Redux State:', { contacts, filter });
//   }, [dispatch, contacts, filter]);

//   useEffect(() => {
//     localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
//   }, [contacts]);

//   const handleAddContact = (name, number) => {
//     console.log('Adding contact:', name, number);
//     const isNameAlreadyExist = contacts.some(contact => contact.name === name);

//     if (isNameAlreadyExist) {
//       alert(`Contact with name ${name} already exists!`);
//     } else {
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };
//       dispatch(addContact([newContact]));
//     }
//   };

//   const handleSearchChange = e => {
//     dispatch(setSearchTerm(e.target.value));
//   };

//   const handleDeleteContact = id => {
//     dispatch(deleteContact(id));
//   };

//   const filteredContacts = useMemo(
//     () =>
//       contacts.filter(contact =>
//         contact.name.toLowerCase().includes(filter.toLowerCase())
//       ),
//     [contacts, filter]
//   );

//   return (
//     <div className={styles.addContactContainer}>
//       <h1>Phonebook</h1>
//       <ContactForm onAddContact={handleAddContact} />

//       <h2>Contacts</h2>
//       <Filter value={filter} onChange={handleSearchChange} />
//       {console.log('Filtered Contacts:', filteredContacts)}

//       <ContactList
//         list={filteredContacts}
//         onDeleteContact={handleDeleteContact}
//       />
//     </div>
//   );
// };

// export default App;
