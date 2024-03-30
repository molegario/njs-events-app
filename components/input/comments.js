import { useEffect, useState } from 'react';
import classes from './comments.module.css';
import NewComment from './new-comment';
import CommentList from './comment-list';
import axios from 'axios';
// import useSWR from 'swr';
export default function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [eventComments, setEventComments] = useState();

  useEffect(
    ()=>{
      if(showComments) {
        fetch(`/api/events/${eventId}/comments`).then(response=>response.json()).then(
          resp => setEventComments(resp.comments)
        )
      }
    },
    [showComments]
  );

  function toggleCommentsHandler() {
    setShowComments(prevStatus=> !prevStatus);
  }

  function addCommentHandler({
    email,
    name,
    text
  }) {
    //send to data API
    axios({
      method: 'post',
      url: `/api/events/${eventId}/comments`,
      data: {
        email,
        name,
        text,
      }
    }).then(
      (response) => {
        console.log("NEW COMMENT CREATED", response);
      },

    );
  }

  return <section className={classes.comments}>
    <button onClick={toggleCommentsHandler}>
      { showComments ? 'Hide' : 'Show' } Comments
    </button>
    {
      showComments && <NewComment onAddComment={addCommentHandler} />
    }
    {
      showComments && <CommentList comments={eventComments}/>
    }
  </section>;
}