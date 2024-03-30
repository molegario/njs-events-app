export default function handler(req, res) {


  if(req.method === 'GET') {


    const {eventid} = req.query;



    res.status(200).json({
      message: `details for event ${eventid}`
    })

  } else {
    res.status(200).json({
      message: 'no valid request to process.'
    })
  }



}