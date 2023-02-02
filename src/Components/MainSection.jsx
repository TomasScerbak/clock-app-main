import React, { useEffect, useState } from "react";

import { WorldTimeAPI } from "../Services/APIs/WorldTimeAPI";

//Components
import FooterCardDay from "./FooterCardDay";
import FooterCardNight from "./FooterCardNight";
import Quote from "./Quote";
import Greeting from "./Greeting";
import Clock from "./Clock";
import UserLocation from "./UserLocation";

//CSS
import classes from "./MainSection.module.css";

// Images
import ImageNight from "../Assets/desktop/bg-image-nighttime.jpg";
import ImageDay from "../Assets/desktop/bg-image-daytime.jpg";

const MainSection = () => {
  const [hour, setHour] = useState();

  useEffect(() => {
    WorldTimeAPI().then((data) => {
      const date = new Date(data.datetime);
      const hours = date.getHours();

      if (hours > 18) {
        document.body.style.backgroundImage = `url(${ImageNight})`;
      } else if (hours < 18) {
        document.body.style.backgroundImage = `url(${ImageDay})`;
      }

      setHour(hours);
    });
  }, [hour]);

  return (
    <main>
      <section>
        <div className={classes.container}>
          {!isHidden && <Quote />}
          <Greeting />
          <Clock />
          <UserLocation />
        </div>
        {isHidden && hour < 18 ? <FooterCardDay /> : ""}
        {isHidden && hour > 18 ? <FooterCardNight /> : ""}
      </section>
    </main>
  );
};

export default MainSection;
