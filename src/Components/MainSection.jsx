import axios from "axios";
import React, { useEffect, useState } from "react";

import classes from "./MainSection.module.css";

import ImageNight from "../Assets/desktop/bg-image-nighttime.jpg";
import ImageDay from "../Assets/desktop/bg-image-daytime.jpg";
import RefreshIcon from "../Assets/desktop/icon-refresh.svg";

const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE.substring(1, 41);

const worldTimeAPI = "http://worldtimeapi.org/api/ip";
const ipGeologicalAPI = `https://api.ipbase.com/v2/info?apikey=${API_KEY_VALUE}`;
const randomQuoteAPI = "https://api.quotable.io/random";

const MainSection = () => {
  const [currentTime, setCurrentTime] = useState();
  const [timeZoneCode, setTimeZoneCode] = useState();
  const [userLocation, setUserLocaiton] = useState();
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(worldTimeAPI);
        const date = new Date(data.datetime);
        const timeZoneCode = data.abbreviation;
        const hours = date.getHours();
        const minutes = date.getMinutes();

        /* Getting user innerWidth */
        const userWidth = window.innerWidth;

        if (hours > 18 && userWidth <= 375) {
          document.body.style.backgroundImage = `url(${ImageNight})`;
          document.getElementById("daytime").innerHTML = "Good Evening";
        } else if (hours > 18 && userWidth > 375) {
          document.body.style.backgroundImage = `url(${ImageNight})`;
          document.getElementById("daytime").innerHTML =
            "Good Evening It's Currently";
        } else if (hours < 18 && userWidth <= 375) {
          document.body.style.backgroundImage = `url(${ImageDay})`;
          document.getElementById("daytime").innerHTML = "Good Morning";
        } else if (hours < 18 && userWidth > 375) {
          document.body.style.backgroundImage = `url(${ImageDay})`;
          document.getElementById("daytime").innerHTML =
            "Good Morning It's Currently";
        }

        setCurrentTime(
          `${hours} : ${minutes < 10 ? `${"0" + minutes}` : minutes}`
        );
        setTimeZoneCode(timeZoneCode);
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

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(randomQuoteAPI);
        setQuote(data.content);
        setAuthor(data.author);
      },
    []
  );

  const quoteChangeHandler = () => {
    window.location.reload(true);
  };

  return (
    <main>
      <section>
        <div className={classes.container}>
          <div className={classes["quote-wrapper"]}>
            <p className={classes.quote}>"{quote}"</p>
            <img
              onClick={quoteChangeHandler}
              className={classes["refresh-icon"]}
              src={RefreshIcon}
              alt="refresh button"
            />
          </div>
          <div className={classes.author}>{author}</div>
          <h3 id="daytime" className={classes.daytime}>
            Good Morning It's Currently
          </h3>
          <h1 className={classes["current-time"]}>{currentTime}</h1>
          <div>{timeZoneCode}</div>
          <div>{userLocation}</div>
        </div>
      </section>
    </main>
  );
};

export default MainSection;
