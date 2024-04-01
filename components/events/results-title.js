import LinkButton from '../ui/button/button';
import classes from './results-title.module.css';

export default function ResultsTitle({ date }) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-CA', {
    month: 'long',
    year: 'numeric'
  })

  return <section
    className={classes.title}
  >
    <h1>Events in {humanReadableDate}</h1>
    <LinkButton link='/events'>Show All Events</LinkButton>
  </section>
}