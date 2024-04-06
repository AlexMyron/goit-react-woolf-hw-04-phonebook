import classes from './Contacts.module.css';

const Contacts = ({ contacts, handleDelete }) => {
  return (
    <div className={classes.list}>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={classes.item}>
            <div>
              <span>{name}</span>:&nbsp;
              <span>{number}</span>
            </div>
            <button className={classes.button} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Contacts;
