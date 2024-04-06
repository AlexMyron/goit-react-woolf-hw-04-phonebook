import { Component } from 'react';

import classes from './Form.module.css';

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (!value.trim()) {
      this.setState({ [name]: '' });
      return;
    }

    this.setState({ [name]: value.trim() });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) return;

    this.props.handleContactAdd({ name, number });

    e.target.reset();
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className={classes.form}>
        <div className={classes.content}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={classes.input}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
  }
}
