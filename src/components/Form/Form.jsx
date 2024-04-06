import { useState } from 'react';

import classes from './Form.module.css';

const Form = ({ handleContactAdd }) => {
  const [formState, setFormState] = useState({ name: '', number: '' });

  const handleChange = ({ target: { name, value } }) =>
    setFormState(prevState => ({ ...prevState, [name]: value.trim() }));

  const handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = formState;

    if (!name || !number) return;

    handleContactAdd({ name, number });

    e.target.reset();
  };

  return (
    <form onSubmit={handleFormSubmit} className={classes.form}>
      <div className={classes.content}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={classes.input}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>

      <div className={classes.content}>
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          id="number"
          name="number"
          className={classes.input}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button className={classes.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default Form;