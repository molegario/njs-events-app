import { useContext, useEffect, useState } from 'react';
import classes from './comments.module.css';
import NewComment from './new-comment';
import CommentList from './comment-list';
import axios from 'axios';
import NotificationContext from '../../store/notification-context';
import LoadingContext from '../../store/loading-context';
export default function Comments({ eventId }) {
  const loadingCtx = useContext(LoadingContext);
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [eventComments, setEventComments] = useState();

  useEffect(
    ()=>{
      if(showComments) {
        loadingCtx.showIsLoading();
        fetch(`/api/events/${eventId}/comments`)
          .then(resp=>{
            if(resp.ok) {
              return resp.json();
            } else {
              return resp.json().then(
                data=>{
                  throw new Error(data.message);
                }
              );
            }
          })
          .then(
            resp => {
              loadingCtx.hideIsLoading();
              return setEventComments(resp.comments.toReversed());
            },
            err => {
              loadingCtx.hideIsLoading();
              notificationCtx.showNotification({
                title: 'Failed to retrieve data',
                message: err.message ?? 'Failed to retrieve all comments from DB',
                status: 'error'
              });
            }
          );
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
    loadingCtx.showIsLoading();
    axios({
      method: 'post',
      url: `/api/events/${eventId}/comments`,
      data: {
        email,
        name,
        text,
      }
    }).then(
      (response)=>{
        if(response && response.status === 201 && response.statusText === 'Created') {
          return response;
        } else {
          throw new Error(response.data.message || 'Failed to insert data')
        }
      }
    ).then(
      (response) => {
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
        loadingCtx.hideIsLoading();
      },
      err => {
        loadingCtx.hideIsLoading();
        notificationCtx.showNotification({
          title: `Add comment failed`,
          message: err.message ?? `Failed to add comment by ${name}. Please try again later.`,
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