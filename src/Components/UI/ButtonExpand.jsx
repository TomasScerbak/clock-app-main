import React from "react";

import classes from "./ButtonExpand.module.css";

import ArrowDown from "../../Assets/desktop/icon-arrow-down.svg";

const ButtonExpand = (props) => {
  return (
    <button {...props} className={classes["btn-down"]} type="button">
      More
      <img className={classes["arrow-down"]} src={ArrowDown} alt="#" />
    </button>
  );
};

export default ButtonExpand;
