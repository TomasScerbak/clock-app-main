import React, { useState, useEffect } from "react";

import { IPGeologicalAPI } from "../Services/APIs/IPGeologicalAPI";
import { WorldTimeAPI } from "../Services/APIs/WorldTimeAPI";

import classes from "../Components/FooterCardNight.module.css";

const FooterCardNight = () => {
  const [userLocation, setUserLocaiton] = useState();
  const [dayOfYear, setDayOfYear] = useState();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [weekNumber, setWeekNumber] = useState();

  useEffect(() => {
    WorldTimeAPI().then((data) => {
      const dayOfWeek = data.day_of_week;
      const dayOfYear = data.day_of_year;
      const weekNumber = data.week_number;

      setDayOfWeek(dayOfWeek);
      setDayOfYear(dayOfYear);
      setWeekNumber(weekNumber);
    });
  }, []);

  useEffect(() => {
    IPGeologicalAPI().then((data) => {
      const userLocation = data.data.timezone.id;
      setUserLocaiton(userLocation);
    });
  }, []);

  return (
    <section>
      <div className={classes.card}>
        <div className={classes["card-wrapper"]}>
          <div className={classes.title}>current timezone</div>
          <div className={classes.value}>{userLocation}</div>
        </div>
        <div className={`${classes["card-wrapper"]} ${classes["year"]}`}>
          <div className={classes.title}>day of the year</div>
          <div className={classes.value}>{dayOfYear}</div>
        </div>
        <div className={`${classes["card-wrapper"]} ${classes["week"]}`}>
          <div className={classes.title}>day of the week</div>
          <div className={classes.value}>{dayOfWeek}</div>
        </div>
        <div className={classes["card-wrapper"]}>
          <div className={classes.title}>week number</div>
          <div className={classes.value}>{weekNumber}</div>
        </div>
      </div>
    </section>
  );
};

export default FooterCardNight;
