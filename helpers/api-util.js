const eventsBaseUrl = 'https://olegario-njs-fetching-default-rtdb.firebaseio.com/events.json';

export async function fetchEvents() {
  const resp = await fetch(eventsBaseUrl);
  const respJson = await resp.json();
  const xFormedResp = [];

  for(const key in respJson) {
    xFormedResp.push({
      id: key,
      ...respJson[key]
    });
  }

  return xFormedResp;
}

export async function fetchOneEvent(eventid) {
  const resp = await fetch(`${eventsBaseUrl}?orderBy="$key"&equalTo="${eventid}"`);
  const respJson = await resp.json();
  const xFormedResp = [];

  for(const key in respJson) {
    xFormedResp.push({
      id: key,
      ...respJson[key]
    });
  }

  return xFormedResp;
}