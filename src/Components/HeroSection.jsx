import axios from "axios";
import React, { useEffect, useState } from "react";

const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE.substring(1, 41);

const worldTimeAPI = "http://worldtimeapi.org/api/ip";
const ipGeologicalAPI = `https://api.ipbase.com/v2/info?apikey=${API_KEY_VALUE}`;
const randomQuoteAPI = "https://api.quotable.io/random";

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState();
  const [timeZoneCode, setTimeZoneCode] = useState();
  const [userLocation, setUserLocaiton] = useState();

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(worldTimeAPI);
        const date = new Date(data.datetime);
        const timeZoneCode = data.abbreviation;
        const hours = date.getHours();
        const minutes = date.getMinutes();

        setCurrentTime(`${hours} : ${minutes}`);
        setTimeZoneCode(timeZoneCode);
      },
    []
  );

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(ipGeologicalAPI);
        console.log(data.data);
        const userLocation = data.data.timezone.id;
        setUserLocaiton(userLocation);
      },
    []
  );

  useEffect(
    () =>
      async function () {
        const { data } = await axios.get(randomQuoteAPI);
        console.log(data.content, data.author);
      },
    []
  );

  return (
    <React.Fragment>
      <h1>{currentTime}</h1>
      <div>{timeZoneCode}</div>
      <div>{userLocation}</div>
    </React.Fragment>
  );
};

export default HeroSection;
