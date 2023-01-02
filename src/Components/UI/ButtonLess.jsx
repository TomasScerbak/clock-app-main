import React from "react";

import classes from "./ButtonLess.module.css";

import ArrowUp from "../../Assets/desktop/icon-arrow-up.svg";

const ButtonLess = (props) => {
  return (
    <button {...props} className={classes["btn-up"]} type="button">
      Less
      <img className={classes["arrow-up"]} src={ArrowUp} alt="#" />
    </button>
  );
};

export default ButtonLess;
