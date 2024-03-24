import { useRouter } from "next/router"
import { getFilteredEvents } from "../../dummy-data";
import { Fragment } from "react";
import EventsList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/error-alert";
import LinkButton from "../../components/ui/button";


export default function FilteredEventsPage() {
  const {
    query,
  } = useRouter();

  const filterData = query?.slug;

  if(!filterData) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filterData?.[0];
  const numMonth = +filterData?.[1];

  if(
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <Fragment>
      <ErrorAlert>
        <p>Invalid Filter.  Please adjust your values.</p>
      </ErrorAlert>
      <div className="center">
        <LinkButton link='/events'>Show All Events</LinkButton>
      </div>
    </Fragment>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return <Fragment>
    <ResultsTitle date={`${numYear}/${('00' + numMonth).slice(-2)}/01`}/>
    <EventsList events={filteredEvents} />
  </Fragment>;
}