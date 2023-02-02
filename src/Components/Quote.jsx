import React, { useState, useEffect } from "react";
import { FetchQuoteAPI } from "../Services/APIs/FetchQuoteAPI";
import RefreshIcon from "../Assets/desktop/icon-refresh.svg";

import classes from "./Quote.module.css";

const Quote = () => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    FetchQuoteAPI().then((data) => setQuote(data.content));
  }, []);

  useEffect(() => {
    FetchQuoteAPI().then((data) => setAuthor(data.author));
  }, []);

  const quoteChangeHandler = () => {
    window.location.reload(true);
  };

  return (
    <React.Fragment>
      <div className={classes["quote-wrapper"]}>
        <p className={classes.quote}>"{quote}"</p>
        <img
          onClick={quoteChangeHandler}
          className={classes["refresh-icon"]}
          src={RefreshIcon}
          alt="refresh button"
        />
      </div>
      <div className={classes.author}>{author}</div>
    </React.Fragment>
  );
};

export default Quote;
