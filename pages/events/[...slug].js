import { Fragment, useEffect, useState } from "react";
import EventsList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/error-alert";
import LinkButton from "../../components/ui/button";
// import { fetchEvents } from "../../helpers/api-util";
import useSWR from "swr";
import { useRouter } from "next/router";

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
    numMonth > 12 ||
    error
  ) {
    return <Fragment>
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