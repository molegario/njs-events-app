import { useRef, useState } from 'react';
import classes from './new-comment.module.css';
export default function NewComment({ onAddComment }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const commentRef = useRef();

  function resetForm() {
    emailRef.current.value = '';
    nameRef.current.value = '';
    commentRef.current.value = '';
  }

  function sendCommentHandler(evt) {
    evt.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredComment = commentRef.current.value;

    if(
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    resetForm();
    resetInvalid();
  }

  function resetInvalid() {
    setIsInvalid(false);
  }

  return <form className={classes.form} onSubmit={sendCommentHandler}>
    <div className={classes.row}>
      <div className={classes.control}>
        <label htmlFor='email'>Your email</label>
        <input type='email' id='email' name='email' ref={emailRef} onChange={resetInvalid} />
      </div>
      <div className={classes.control}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' name='name' ref={nameRef} />
      </div>
    </div>
    <div className={classes.control}>
      <label htmlFor='comment'>Your comment</label>
      <textarea id="comment" name="comment" rows='5' ref={commentRef} />
    </div>
    {
      isInvalid && <p>Please enter a valid email address and comment!</p>
    }
    <button>Submit</button>
  </form>;
}