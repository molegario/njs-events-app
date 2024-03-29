import { Fragment } from "react";
import EventsList from "../../components/events/events-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { fetchEvents } from "../../helpers/api-util";
import Head from "next/head";

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

const allmonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default function EventsPage({ allEvents, allValidYears, allValidMonths }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return <Fragment>
    <Head>
      <title>ALL EVENTS</title>
      <meta name="description" content="Find alot of community in our company events."/>
    </Head>
    <EventsSearch 
      onSearchSubmit={findEventsHandler} 
      allValidYears={allValidYears} 
      allValidMonths={allValidMonths}
    />
    <EventsList events={allEvents} />
  </Fragment>;
}

export async function getStaticProps(context) {
  const xFormedResp = await fetchEvents();
  const allValidYears = xFormedResp.map(
    x=>{
      return new Date(x.date).getFullYear();
    }
  ).filter(onlyUnique).sort();
  const allValidMonths = xFormedResp.map(
    xx=>{
      return new Date(xx.date).getMonth()
    }
  ).filter(onlyUnique).sort().map(yy=>({
    value: yy + 1,
    label: allmonths[yy]
  }));

  return {
    props: {
      allEvents: xFormedResp,
      allValidYears,
      allValidMonths,
    },
    revalidate: 10
  }
}