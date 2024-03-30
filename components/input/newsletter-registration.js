import axios from 'axios';
import classes from './newsletter-registration.module.css';
import { useRef, useState } from 'react';

export default function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailRef = useRef();

  function registrationHandler(evt) {
    evt.preventDefault();

    console.log("REGISTER::START::", emailRef.current.value);

    axios({
      method: 'post',
      url: '/api/recipients',
      data: {
        email: emailRef.current.value,
      }
    }).then(response=>{
      console.log("NEW RECIPIENT REGISTERED.");



    }, err => {
      console.log('REG::ERROR::', err);





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