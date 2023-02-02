import React, { useState, useEffect } from "react";
import { WorldTimeAPI } from "../Services/APIs/WorldTimeAPI";

import Sun from "../Assets/desktop/icon-sun.svg";
import Moon from "../Assets/desktop/icon-moon.svg";

import classes from "./Greeting.module.css";

const Greeting = () => {
  const [hour, setHour] = useState();
  const [userWidth, setUserWidth] = useState(window.innerWidth);

  // Getting user width and storing it into state to determine greeting length according user screen width
  const updateMedia = () => {
    setUserWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    WorldTimeAPI().then((data) => {
      const date = new Date(data.datetime);
      const hours = date.getHours();
      setHour(hours);

      if (userWidth < 576 && hours < 18) {
        document.getElementById("daytime").innerHTML = "Good Morning";
      } else if (userWidth > 576 && hours < 18) {
        document.getElementById("daytime").innerHTML =
          "Good Morning It's currently";
      } else if (userWidth < 576 && hours > 18) {
        document.getElementById("daytime").innerHTML = "Good evening";
      } else if (userWidth > 576 && hours > 18) {
        document.getElementById("daytime").innerHTML =
          "Good evening It's currently";
      }
    });
  }, [userWidth, hour]);

  return (
    <div className={classes.greeting}>
      <img
        className={classes["daytime-image"]}
        src={hour < 18 ? Sun : Moon}
        alt="#"
      />
      <h3 id="daytime" className={classes.daytime}>
        Good Morning
      </h3>
    </div>
  );
};

export default Greeting;
