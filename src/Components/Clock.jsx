import React, { useState, useEffect } from "react";
import { WorldTimeAPI } from "../Services/APIs/WorldTimeAPI";

import classes from "./Clock.module.css";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState();
  const [timeZoneCode, setTimeZoneCode] = useState();

  useEffect(() => {
    WorldTimeAPI().then((data) => {
      const date = new Date(data.datetime);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const timeZoneCode = data.abbreviation;

      setCurrentTime(
        `${hours} : ${minutes < 10 ? `${"0" + minutes}` : minutes}`
      );

      setTimeZoneCode(timeZoneCode);
    });
  }, []);

  return (
    <div className={classes["clock-time__wrapper"]}>
      <h1 className={classes["current-time"]}>{currentTime}</h1>
      <div className={classes["time-zone"]}>{timeZoneCode}</div>
    </div>
  );
};

export default Clock;
