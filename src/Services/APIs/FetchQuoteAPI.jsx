import axios from "axios";

const randomQuoteAPI = "https://api.quotable.io/random";

export const FetchQuoteAPI = async () => {
  const { data } = await axios.get(randomQuoteAPI);
  return data;
};
