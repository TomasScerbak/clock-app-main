import axios from "axios";
import React, { useState, useEffect } from "react";

import classes from "../Components/FooterCardNight.module.css";

const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE.substring(1, 41);

const worldTimeAPI = "http://worldtimeapi.org/api/ip";
const ipGeologicalAPI = `https://api.ipbase.com/v2/info?apikey=${API_KEY_VALUE}`;

const FooterCardNight = () => {
  const [userLocation, setUserLocaiton] = useState();
  const [dayOfYear, setDayOfYear] = useState();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [weekNumber, setWeekNumber] = useState();

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(worldTimeAPI);
        const dayOfWeek = data.day_of_week;
        const dayOfYear = data.day_of_year;
        const weekNumber = data.week_number;

        setDayOfWeek(dayOfWeek);
        setDayOfYear(dayOfYear);
        setWeekNumber(weekNumber);
      },
    []
  );

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(ipGeologicalAPI);
        const userLocation = data.data.timezone.id;
        setUserLocaiton(userLocation);
      },
    []
  );

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
