import classes from './event-content.module.css';
export default function EventContent({
  children
}) {
  return <section className={classes.content}>
    {children}
  </section>;
}