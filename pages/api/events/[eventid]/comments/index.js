import { connectToDB, getAllDocumentsFromCollection, insertDocumentToCollection } from '../../../../../helpers/db-util';

export default async function handler(req, res) {
  if(
    req.method === 'POST'
  ) {
    const {
      email,
      name,
      text
    } = req.body;
    const {eventid} = req.query;

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
      eventid,
      email,
      name,
      text,
    };
    let client;

    try {
      client = await connectToDB('eventcomments');
    } catch(err) {
      res.status(500).json({
        message: 'Could not connect to DB'
      });
      return;
    }
    
    let resp;
    try {
      resp = await insertDocumentToCollection(client, 'comments', newComment);
      client.close();
    } catch(err) {
      res.status(500).json({
        message: 'Could not connect to DB'
      });
      client.close();
      return;
    }

    res.status(201).json({
      message: 'successfully inserted comment.',
      insertedId: resp.insertedId,
      comment: newComment
    });
  } else if(req.method === 'GET') {
    const { eventid } = req.query;  
    let client;
    try {
      client = await connectToDB('eventcomments');
    } catch(err) {
      res.status(500).json({
        message: 'Could not connect to DB'
      });
      return;
    }

    let eventcomments;
    try {
      eventcomments = await getAllDocumentsFromCollection(client, 'comments', { eventid });
      client.close();
    } catch(err) {
      res.status(500).json({
        message: 'Could not retrieve comments for event'
      });
      client.close();
      return;
    }

    res.status(200).json({
      eventid,
      comments: eventcomments
    })

  } else {
    res.status(200).json({
      message: 'no valid request to process.'
    })
  }
}