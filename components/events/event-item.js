import classes from './event-item.module.css';
import LinkButton from "../ui/button";
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';

export default function EventItem({ title, image, date, location, id }) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`;

  return <li className={classes.item}>
    <img src={`https://olegario-nextjs-projects-bucket.s3.ca-central-1.amazonaws.com/${image}`} alt="" />
    <div className={classes.content}>
      <div className={classes.summary}>
        <h2>{title}</h2>
        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div className={classes.actions}>
        <LinkButton link={exploreLink}>
          <span>Explore Event</span>
          <span className={classes.icon}>
            <ArrowRightIcon />
          </span>
        </LinkButton>
      </div>
    </div>
  </li>
}