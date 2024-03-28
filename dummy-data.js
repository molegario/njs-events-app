const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'coding-event.jpg',
    isFeatured: false,
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'introvert-event.jpg',
    isFeatured: true,
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'extrovert-event.jpg',
    isFeatured: true,
  },
];

export function getFeatureEvents() {
  return DUMMY_EVENTS.filter(event=>event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  // year = typeof year === 'string' ? parseInt(year, 10) : year;
  // month = typeof month === 'string' ? parseInt(month, 10) : month;

  return DUMMY_EVENTS.filter(event=>{
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && (eventDate.getMonth() + 1) === month;
  });
}

export function getEventById(id) {
  return DUMMY_EVENTS.find(event=>event.id === id);
}


export function getAllSelectableYears() {
  const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  
  return DUMMY_EVENTS.map(x=>{
    const eventDate = new Date(x.date);
    return eventDate.getFullYear();
  }).filter(onlyUnique).sort();
}

export function getAllSelectableMonths() {
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
  
  return DUMMY_EVENTS.map(x=>{
    const eventDate = new Date(x.date);
    return eventDate.getMonth();
  }).filter(onlyUnique).sort().map(xx=>({
    value: xx + 1,
    label: allmonths[xx]
  }));
}