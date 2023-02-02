import axios from "axios";
import React, { useEffect, useState } from "react";

//Components
import ButtonExpand from "./UI/ButtonExpand";
import ButtonLess from "./UI/ButtonLess";
import FooterCardDay from "./FooterCardDay";
import FooterCardNight from "./FooterCardNight";
import Quote from "./Quote";
import Greeting from "./Greeting";

//CSS
import classes from "./MainSection.module.css";

// Images
import ImageNight from "../Assets/desktop/bg-image-nighttime.jpg";
import ImageDay from "../Assets/desktop/bg-image-daytime.jpg";

const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE.substring(1, 41);

const worldTimeAPI = "http://worldtimeapi.org/api/ip";
const ipGeologicalAPI = `https://api.ipbase.com/v2/info?apikey=${API_KEY_VALUE}`;

const MainSection = () => {
  const [currentTime, setCurrentTime] = useState();
  const [timeZoneCode, setTimeZoneCode] = useState();
  const [userLocation, setUserLocaiton] = useState();
  const [hour, setHour] = useState();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(worldTimeAPI);
        const date = new Date(data.datetime);
        const timeZoneCode = data.abbreviation;
        const hours = date.getHours();
        const minutes = date.getMinutes();

        setCurrentTime(
          `${hours} : ${minutes < 10 ? `${"0" + minutes}` : minutes}`
        );
        setTimeZoneCode(timeZoneCode);

        setHour(hours);
      },
    [hour]
  );

  // useEffect(
  //   () =>
  //     async function () {
  //       const { data } = await axios.get(ipGeologicalAPI);
  //       const userLocation = data.data.timezone.id;
  //       setUserLocaiton(userLocation);
  //     },
  //   []
  // );

  const isHiddenHandler = () => {
    setIsHidden((prev) => (!prev ? true : false));
  };

  return (
    <main>
      <section>
        <div className={classes.container}>
          {!isHidden && <Quote />}
          <Greeting />
          {/* <div className={classes.greeting}>
            <img
              className={classes["daytime-image"]}
              src={hour < 18 ? Sun : Moon}
              alt="#"
            />
            <h3 id="daytime" className={classes.daytime}>
              Good Morning
            </h3>
          </div> */}
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
        {isHidden && hour < 18 ? <FooterCardDay /> : ""}
        {isHidden && hour > 18 ? <FooterCardNight /> : ""}
      </section>
    </main>
  );
};

export default MainSection;
