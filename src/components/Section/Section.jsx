import classes from './Section.module.css';

const Section = ({ title, children }) => {
  return (
    <section className={classes.container}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};
export default Section;
