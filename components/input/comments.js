import { useEffect, useState } from 'react';
import classes from './comments.module.css';
import NewComment from './new-comment';
import CommentList from './comment-list';
import axios from 'axios';
import NotificationContext from '../../store/notification-context';
// import useSWR from 'swr';
export default function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [eventComments, setEventComments] = useState();

  const notificationCtx = useContext(NotificationContext);

  useEffect(
    ()=>{
      if(showComments) {
        fetch(`/api/events/${eventId}/comments`).then(response=>response.json()).then(
          resp => setEventComments(resp.comments.toReversed())
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

    notificationCtx.showNotification({
      title: `Adding new comment`,
      message: `Adding comment by ${name}`,
      status: 'pending'
    });

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
        // console.log("NEW COMMENT CREATED", response);
        notificationCtx.showNotification({
          title: `Add comment succeeded`,
          message: `Added comment by ${name}`,
          status: 'success'
        });
  
        setEventComments(
          prevComments => {
            return [
              {
                ...response.data.comment,
                _id: response.data.insertedId
              },
              ...prevComments,
            ];
          }
        );
      },
      err => {
        notificationCtx.showNotification({
          title: `Add comment failed`,
          message: `Failed to add comment by ${name}. Please try again later.`,
          status: 'error'
        });
      }
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