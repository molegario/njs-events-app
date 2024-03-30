export default function handler(req, res) {
  if(
    req.method === 'POST'
  ) {
    const {
      email,
    } = req.body;

    console.log('NEW RECIPIENT::TO BE REGISTERED', email);

    if(!email || !email.includes('@')) {
      res.status(422).json({
        message: 'Invalid email address.'
      });
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