import React, { useState, useEffect } from "react";
import { IPGeologicalAPI } from "../Services/APIs/IPGeologicalAPI";

import ButtonExpand from "./UI/ButtonExpand";
import ButtonLess from "./UI/ButtonLess";

import classes from "./UserLocation.module.css";

const UserLocation = () => {
  const [userLocation, setUserLocaiton] = useState();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    IPGeologicalAPI().then((data) => {
      const userLocation = data.data.timezone.id;
      setUserLocaiton(userLocation);
    });
  }, []);

  const isHiddenHandler = () => {
    setIsHidden((prev) => (!prev ? true : false));
  };

  return (
    <div className={classes["user-location__wrapper"]}>
      <div className={classes["user-location"]}>{userLocation}</div>
      {!isHidden && <ButtonExpand onClick={isHiddenHandler} />}
      {isHidden && <ButtonLess onClick={isHiddenHandler} />}
    </div>
  );
};

export default UserLocation;
