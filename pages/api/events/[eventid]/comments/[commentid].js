export default function handler(req, res) {
  if(req.method === 'GET') {
    const { eventid, commentid } = req.query;
    console.log(`COMMENT::${commentid}::GET::EVENT::${eventid}`, eventid);
    res.status(200).json({
      eventid,
      commentid,
      comment: {},
    })

  } else {
    res.status(200).json({
      message: 'no valid request to process.'
    })
  }

}