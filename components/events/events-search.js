import { useRef } from "react";
import { getAllSelectableMonths, getAllSelectableYears } from "../../dummy-data";
import LinkButton from "../ui/button/button";
import classes from './events-search.module.css';

export default function EventsSearch({
  onSearchSubmit
}) {
  const allYears = getAllSelectableYears();
  const allMonths = getAllSelectableMonths();
  const YearRef = useRef();
  const MonthRef = useRef();

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onSearchSubmit(YearRef.current.value,MonthRef.current.value);
  }

  return <form className={classes.form} onSubmit={handleSearchSubmit}>
    <div className={classes.controls}>
      <div className={classes.control}>
        <label htmlFor="year">Year</label>
        <select id="year" name="year" ref={YearRef}>
          {
            allYears.map(year=><option key={year} value={year}>{year}</option>)
          }
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="year">Month</label>
        <select id="month" name="month" ref={MonthRef}>
          {
            allMonths.map(month=><option key={`${month.label}_${month.value}`} value={month.value}>{month.label}</option>)
          }
        </select>
      </div>
    </div>
    <LinkButton>Search</LinkButton>
  </form>;
}