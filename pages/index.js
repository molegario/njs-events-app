import Head from "next/head";
import EventsList from "../components/events/events-list";
import { fetchEvents } from "../helpers/api-util";

export default function AppRoot({ featuredEvents }) {
  return <div>
    <Head>
      <title>NEXT EVENTS</title>
      <meta name="description" content="Featured in our company events."/>
    </Head>
    <EventsList events={featuredEvents}/>
  </div>;
}

export async function getStaticProps(context) {
  const xFormedResp = await fetchEvents();
  return {
    props: {
      featuredEvents: xFormedResp.filter(xx=>xx.isFeatured)
    },
    revalidate: 10
  }
}