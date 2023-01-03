import React from "react";

import classes from "../Components/FooterCard.module.css";

const FooterCard = () => {
  return (
    <section>
      <div className={classes.card}>
        <div className={classes["card-wrapper"]}>
          <div className={classes.title}>current timezone</div>
          <div className={classes.value}>Europe / London</div>
        </div>
        <div className={`${classes["card-wrapper"]} ${classes["year"]}`}>
          <div className={classes.title}>day of the year</div>
          <div className={classes.value}>295</div>
        </div>
        <div className={`${classes["card-wrapper"]} ${classes["week"]}`}>
          <div className={classes.title}>day of the week</div>
          <div className={classes.value}>5</div>
        </div>
        <div className={classes["card-wrapper"]}>
          <div className={classes.title}>week number</div>
          <div className={classes.value}>42</div>
        </div>
      </div>
    </section>
  );
};

export default FooterCard;
