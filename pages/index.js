// import EventItem from "../components/event-item";
import EventsList from "../components/events/events-list";
import { getFeatureEvents } from "../dummy-data";

export default function AppRoot() {

  const featuredEvents = getFeatureEvents();

  return <div>
    <EventsList events={featuredEvents}/>
  </div>;
}