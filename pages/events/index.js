import { Fragment } from "react";
import EventsList from "../../components/events/events-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

export default function EventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  function findEventsHander(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return <Fragment>
    <EventsSearch onSearchSubmit={findEventsHander}/>
    <EventsList events={allEvents} />
  </Fragment>;
}