import axios from "axios";
import React, { useEffect, useState } from "react";

import ButtonExpand from "./UI/ButtonExpand";
import ButtonLess from "./UI/ButtonLess";
import FooterCard from "./FooterCard";

import classes from "./MainSection.module.css";

// Images
import ImageNight from "../Assets/desktop/bg-image-nighttime.jpg";
import ImageDay from "../Assets/desktop/bg-image-daytime.jpg";
import RefreshIcon from "../Assets/desktop/icon-refresh.svg";
import Sun from "../Assets/desktop/icon-sun.svg";
import Moon from "../Assets/desktop/icon-moon.svg";

const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE.substring(1, 41);

const worldTimeAPI = "http://worldtimeapi.org/api/ip";
const ipGeologicalAPI = `https://api.ipbase.com/v2/info?apikey=${API_KEY_VALUE}`;
const randomQuoteAPI = "https://api.quotable.io/random";

const MainSection = (props) => {
  const [currentTime, setCurrentTime] = useState();
  const [timeZoneCode, setTimeZoneCode] = useState();
  const [userLocation, setUserLocaiton] = useState();
  const [hour, setHour] = useState();
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [userWidth, setUserWidth] = useState(window.innerWidth);
  const [isHidden, setIsHidden] = useState(false);

  const updateMedia = () => {
    setUserWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(worldTimeAPI);
        const date = new Date(data.datetime);
        const timeZoneCode = data.abbreviation;
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if (hours > 18) {
          document.body.style.backgroundImage = `url(${ImageNight})`;
        } else if (hours < 18) {
          document.body.style.backgroundImage = `url(${ImageDay})`;
        }

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

        setCurrentTime(
          `${hours} : ${minutes < 10 ? `${"0" + minutes}` : minutes}`
        );
        setTimeZoneCode(timeZoneCode);

        setHour(hours);
      },
    [userWidth, hour]
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

  const isHiddenHandler = () => {
    setIsHidden((prev) => (!prev ? true : false));
  };

  return (
    <main>
      <section>
        <div className={classes.container}>
          {!isHidden && (
            <div className={classes["quote-wrapper"]}>
              <p className={classes.quote}>"{quote}"</p>
              <img
                onClick={quoteChangeHandler}
                className={classes["refresh-icon"]}
                src={RefreshIcon}
                alt="refresh button"
              />
            </div>
          )}
          {!isHidden && <div className={classes.author}>{author}</div>}
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
          <div className={classes["clock-time__wrapper"]}>
            <h1 className={classes["current-time"]}>{currentTime}</h1>
            <div className={classes["time-zone"]}>{timeZoneCode}</div>
          </div>
          <div className={classes["user-location__wrapper"]}>
            <div className={classes["user-location"]}>{userLocation}</div>
            {!isHidden && <ButtonExpand onClick={isHiddenHandler} />}
            {isHidden && <ButtonLess onClick={isHiddenHandler} />}
          </div>
        </div>
        {isHidden && <FooterCard />}
      </section>
    </main>
  );
};

export default MainSection;
