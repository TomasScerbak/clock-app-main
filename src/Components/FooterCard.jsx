import React from "react";

import classes from "../Components/FooterCard.module.css";

const FooterCard = () => {
  return (
    <section>
      <div className={classes.card}>
        <div className="card-wrapper_one">
          <div>current timezone</div>
          <div>Europe / London</div>
        </div>
        <div className="card-wrapper_two">
          <div>day of the year </div>
          <div>295</div>
        </div>
        <div className="card-wrapper_two">
          <div>day of the week </div>
          <div>5</div>
        </div>
        <div className="card-wrapper_two">
          <div>week number </div>
          <div>42</div>
        </div>
      </div>
    </section>
  );
};

export default FooterCard;
