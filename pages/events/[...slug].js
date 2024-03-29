import { Fragment, useEffect, useState } from "react";
import EventsList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/error-alert";
import LinkButton from "../../components/ui/button";
import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";

export default function FilteredEventsPage({}) {
  const router = useRouter();
  const filterData = router.query.slug;
  const [events, setEvents] = useState([]);
  const {
    data,
    error
  } = useSWR(
    'https://olegario-njs-fetching-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then(res => res.json())
  );

  function getReadableDate(filterData) {
    const numYear = +filterData?.[0];
    const numMonth = +filterData?.[1];
    const FilterDateString = `${numYear}/${('00' + numMonth).slice(-2)}/01`;

    return  new Date(FilterDateString).toLocaleDateString('en-CA', {
      month: 'long',
      year: 'numeric'
    });
  }

  const numYear = +filterData?.[0];
  const numMonth = +filterData?.[1];

  function pageHead(filterData, invalid) {
    return <Head>
      <title>{invalid ? 'Events for a specific month - invalid range' : `Events in ${getReadableDate(filterData)}`}</title>
      <meta name="description" content={invalid ? `An invalid date range was requested - no events found` : `Browse all our events for the month of ${getReadableDate(filterData)}`}/>
    </Head>;
  }

  useEffect(
    () => {
      const xFormedEvents = [];
      if(typeof data !== 'undefined') { //prevent blinking
        for (const key in data) {
          xFormedEvents.push({
            id: key,
            ...data[key]
          });
        }
        setEvents(xFormedEvents);  
      }
    },
    [data]
  );

  if(!filterData) {
    return <Fragment>
      { pageHead(filterData) }
      <p className="center">Loading...</p>
    </Fragment>;
  }

  if(
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return <Fragment>
      { pageHead(filterData, true) } 
      <ErrorAlert>
        <p>Filters are invalid.  Please re-adjust your selection.</p>
      </ErrorAlert>
      <div className="center">
        <LinkButton link='/events'>Show All Events</LinkButton>
      </div>
    </Fragment>;
  }

  const filteredEvents = events.filter(
    event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === numYear && (eventDate.getMonth() + 1) === numMonth;
    }
  );

  return <Fragment>
    { pageHead(filterData) }
    <ResultsTitle date={`${numYear}/${('00' + numMonth).slice(-2)}/01`}/>
    <EventsList events={filteredEvents} />
  </Fragment>;
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const numYear = +filterData?.[0];
//   const numMonth = +filterData?.[1];

//   if(
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true
//       }
//     };
//   }

//   const xFormedResp = await fetchEvents();

//   return {
//     props: {
//       filteredEvents: xFormedResp.filter(
//         event => {
//           const eventDate = new Date(event.date);
//           return eventDate.getFullYear() === numYear && (eventDate.getMonth() + 1) === numMonth;
//         }
//       ),
//       // numYear,
//       // numMonth
//     },
//   };
// }