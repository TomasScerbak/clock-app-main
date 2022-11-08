import axios from "axios";
import React, { useEffect, useState } from "react";

import ImageNight from "../Assets/desktop/bg-image-nighttime.jpg";
import ImageDay from "../Assets/desktop/bg-image-daytime.jpg";

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

        if (hours > 12) {
          document.body.style.backgroundImage = `url(${ImageNight})`;
          document.querySelector(".daytime").innerHTML =
            "Good Evening It's Currently";
        } else {
          document.body.style.backgroundImage = `url(${ImageDay})`;
          document.querySelector(".daytime").innerHTML =
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

  return (
    <main>
      <section>
        <div>{quote}</div>
        <div>{author}</div>
        <h2 className="daytime"></h2>
        <h1>{currentTime}</h1>
        <div>{timeZoneCode}</div>
        <div>{userLocation}</div>
      </section>
    </main>
  );
};

export default MainSection;
