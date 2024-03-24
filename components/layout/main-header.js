import Link from "next/link";
// import { Fragment } from "react";
import classes from './main-header.module.css';
export default function MainHeader() {
  return <header className={classes.header}>
    <div className={classes.logo}>
      <Link href="/">Next Events</Link>
    </div>
    <nav className={classes.navigation}>
      <ul>
        <Link href="/events">Browse All Events</Link>
      </ul>
    </nav>
  </header>;
}