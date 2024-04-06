import classes from './Filter.module.css';

const Filter = ({ handleChange, isFilterDisabled }) => {
  return (
    <>
      <h3 className={classes.title}>Find Contacts by name</h3>
      <input
        type="text"
        name="filter"
        disabled={isFilterDisabled}
        className={classes.input}
        onChange={handleChange}
      />
    </>
  );
};

export default Filter;
