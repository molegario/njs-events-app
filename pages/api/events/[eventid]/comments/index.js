export default function handler(req, res) {
  if(
    req.method === 'POST'
  ) {
    const {
      email,
      name,
      text
    } = req.body;

    const {eventid} = req.query;

    console.log('NEW COMMENT::', email, name, text, eventid);

    //VALIDATION
    if(
      !email.includes('@') ||
      !name ||
      !name.trim() === '' ||
      !text ||
      !text.trim() === ''
    ) {
      res.status(422).json({message: 'invalid input'})
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res.status(201).json({
      message: 'successfully inserted comment.',
      comment: newComment
    });


  } else if(req.method === 'GET') {
    const { eventid } = req.query;




    console.log(`COMMENTS::GET::EVENT::${eventid}`, eventid);




    res.status(200).json({
      eventid,
      comments: [
        {
          id: 'c1',
          email: 'me1@place.com',
          name: 'Jay the dude',
          text: 'comment 1 test comment phrase'
        },
        {
          id: 'c2',
          email: 'me222@place.com',
          name: 'Mike the dude',
          text: 'comment 2 test comment phrase'
        },
        {
          id: 'c3',
          email: 'me345@place.com',
          name: 'Sam the dude',
          text: 'comment 3 test comment phrase'
        },
      ]
    })

  } else {
    res.status(200).json({
      message: 'no valid request to process.'
    })
  }

}