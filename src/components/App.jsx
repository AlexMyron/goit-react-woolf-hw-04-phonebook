import { useState } from 'react';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

const App = () => {
  const [contactsList, setContactsList] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const handleContactAdd = newContact => {
    const isContactExists = contactsList.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    isContactExists
      ? toast(`Contact "${newContact.name}" already exists`)
      : setContactsList(prev => [...prev, { ...newContact, id: nanoid() }]);
  };

  const handleChange = ({ target: { value } }) => setFilterValue(value.trim());

  const handleFilterContacts = () =>
    contactsList.length
      ? contactsList.filter(({ name }) =>
          name.toLowerCase().startsWith(filterValue.toLowerCase())
        )
      : [];

  const handleDelete = id =>
    setContactsList(prevList => prevList.filter(contact => contact.id !== id));

  const filteredContacts = handleFilterContacts();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Phonebook">
        <Form handleContactAdd={handleContactAdd} />
      </Section>
      <Section title="Contacts">
        <Filter
          handleChange={handleChange}
          isFilterDisabled={!contactsList.length}
        />
        {!!filteredContacts.length && (
          <Contacts
            contacts={filteredContacts || []}
            handleDelete={handleDelete}
          />
        )}
      </Section>
      <ToastContainer />
    </div>
  );
};

export { App };
