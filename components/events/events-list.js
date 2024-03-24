import LinkButton from "../ui/button";
import ErrorAlert from "./error-alert";
import EventItem from "./event-item";

import classes from './events-list.module.css';

export default function EventsList({events}) {
  return <>
    {
      Array.isArray(events) &&
      events.length > 0 ?
      <ul className={classes.list}>
        {
          events.map(event=><EventItem key={event.id} {...event} />)
        }
      </ul> :
      <ErrorAlert>
        <p className="center">No events available.</p>
      </ErrorAlert>
    }
  </>;
}