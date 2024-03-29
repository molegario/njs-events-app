import classes from './event-logistics.module.css';
import LogisticsItem from './logistics-item';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import Image from 'next/image';
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
      <Image src={`https://olegario-nextjs-projects-bucket.s3.ca-central-1.amazonaws.com/${image}`} alt={imageAlt} width={240} height={160}/>
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