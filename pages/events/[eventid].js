import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/events/error-alert";
import LinkButton from "../../components/ui/button/button";
import { fetchEvents, fetchOneEvent } from "../../helpers/api-util";
import Head from "next/head";
import Comments from "../../components/input/comments";
import LoadingContext, { LoadingContextProvider } from "../../store/loading-context";

export default function EventDetailsPage({ eventDetails }) {

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
    <Head>
      <title>{eventDetails.title}</title>
      <meta name="description" content={eventDetails.description}/>
    </Head>
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
    <LoadingContextProvider>
      <Comments eventId={eventDetails.id} />
    </LoadingContextProvider>
  </Fragment>;
}

export async function getStaticPaths() {
  const xFormedResp = await fetchEvents();
  return {
    paths: xFormedResp.filter(xx=>xx.isFeatured).map(gg=>({
      params: {
        eventid: gg.id
      }
    })),
    fallback: true // false falls back to [..slug] -> events
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const xFormedResp = await fetchOneEvent(params.eventid);
  
  return {
    props: {
      eventDetails: xFormedResp[0] ?? null
    },
    revalidate: 10,
  };
}