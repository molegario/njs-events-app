import axios from 'axios';
import classes from './newsletter-registration.module.css';
import { useContext, useRef, useState } from 'react';
import NotificationContext from '../../store/notification-context';

export default function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const [isInvalid, setIsInvalid] = useState(false);
  const emailRef = useRef();

  function registrationHandler(evt) {
    evt.preventDefault();

    // console.log("REGISTER::START::", emailRef.current.value);

    notificationCtx.showNotification({
      title: `Registering recipient`,
      message: `Registering email ${emailRef.current.value}`,
      status: 'pending'
    });

    axios({
      method: 'post',
      url: '/api/recipients',
      data: {
        email: emailRef.current.value,
      }
    }).then(
      response=>{
        if(response && response.status === 201 && response.statusText === 'Created') {
          return response;
        } else {
          throw new Error(response.data.message || 'Failed to insert record')
        }
      }
    ).then(response=>{
      notificationCtx.showNotification({
        title: `Registered recipient succeeded`,
        message: `Registered email ${emailRef.current.value}`,
        status: 'success'
      });
  
      emailRef.current.value = '';

    }, err => {
      notificationCtx.showNotification({
        title: `Registered recipient failed`,
        message: err.message ?? `Failed to register email ${emailRef.current.value}. Please try again later.`,
        status: 'error'
      });
    });

    const enteredEmail = emailRef.current.value;

    if(
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      setIsInvalid(true);
      return;
    }
  }

  function resetInvalid() {
    setIsInvalid(false);
  }

  return <section className={classes.newsletter}>
    <h2>Sign up to stay updated!</h2>
    <form onSubmit={registrationHandler}>
      <div className={classes.control}>
        <input type='email' id='email' placeholder='Your email' aria-label='Your email' ref={emailRef} onChange={resetInvalid} />
        <button>Register</button>
      </div>
      {
          isInvalid && <p>Please enter a valid email address!</p>
      }
    </form>
  </section>;
}