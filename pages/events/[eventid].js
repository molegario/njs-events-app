import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/events/error-alert";
import LinkButton from "../../components/ui/button";
export default function EventDetailsPage() {
  const {
    query,
  } = useRouter();
  const {eventid} = query;
  const eventDetails = getEventById(eventid);

  if(!eventDetails) {
    return <Fragment>
      <ErrorAlert>
        <p>No event was found for the given eventid.</p>
      </ErrorAlert>
      <div className="center">
        <LinkButton link='/events'>Show All Events</LinkButton>
      </div>
    </Fragment>
  }

  return <Fragment>
    <EventSummary title={eventDetails.title} />
    <EventLogistics 
      date={eventDetails.date}
      address={eventDetails.location}
      image={eventDetails.image}
      imageAlt={eventDetails.imageAlt}
    />
    <EventContent>
      <p>{eventDetails.description}</p>
    </EventContent>
  </Fragment>;
}