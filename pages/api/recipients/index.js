import { connectToDB, insertDocumentToCollection } from '../../../helpers/db-util';

export default async function handler(req, res) {
  if(
    req.method === 'POST'
  ) {
    const {
      email,
    } = req.body;

    if(!email || !email.includes('@')) {
      res.status(422).json({
        message: 'Invalid email address.'
      });
      return;
    }

    let client;

    try {
      client = await connectToDB('recipients');
    } catch(err) {
      res.status(500).json({
        message: 'Could not connect to DB'
      });
      return;
    }

    try {
      await insertDocumentToCollection(
        client,
        'emails',
        {
          email
        }
      );
      client.close(); //if there was a client to close close it
    } catch(err) {
      res.status(500).json({
        message: 'Could not insert new recipient to DB'
      });
      client.close(); //if there was a client to close close it - ??
      return;
    }

    res.status(201).json({
      message: 'successfully inserted new recipient.'
    });

  } else {
    res.status(200).json({
      message: 'no valid request to process.'
    });
  }
}