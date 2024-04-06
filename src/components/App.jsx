import { Component } from 'react';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  handleContactAdd = newContact => {
    const { contacts } = this.state;

    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isContactExists) {
      toast(`Contact "${newContact.name}" already exists`);
      return;
    }

    this.setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, { ...newContact, id: nanoid() }],
    }));
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (!value.trim()) {
      this.setState({ [name]: '' });
      return;
    }

    this.setState({ [name]: value.trim() });
  };

  handleFilter = () => {
    const contacts = [...this.state.contacts];
    const { filter: query } = this.state;
    if (!contacts.length) return [];

    return contacts.filter(({ name }) =>
      name.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  handleDelete = id => {
    this.setState(prev => {
      const contacts = [...prev.contacts];
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      return { ...prev, contacts: updatedContacts };
    });
  };

  render() {
    const filteredContacts = this.handleFilter();
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
          <Form handleContactAdd={this.handleContactAdd} />
        </Section>
        <Section title="Contacts">
          <Filter
            handleChange={this.handleChange}
            isFilterDisabled={!this.state.contacts.length}
          />
          {!!filteredContacts.length && (
            <Contacts
              contacts={filteredContacts || []}
              handleDelete={this.handleDelete}
            />
          )}
        </Section>
        <ToastContainer />
      </div>
    );
  }
}
export { App };
