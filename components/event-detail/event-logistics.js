import classes from './event-logistics.module.css';
import LogisticsItem from './logistics-item';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
export default function EventLogistics({
  date,
  address,
  image,
  imageAlt
}) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const addressText = address?.replace(', ', '\n');

  return <section className={classes.logistics}>
    <div className={classes.image}>
      <img src={`/${image}`} alt={imageAlt} />
    </div>
    <ul className={classes.list}>
      <LogisticsItem icon={DateIcon}>
        <time>{humanReadableDate}</time>
      </LogisticsItem>
      <LogisticsItem icon={AddressIcon}>
        <address>{addressText}</address>
      </LogisticsItem>
    </ul>
  </section>
}