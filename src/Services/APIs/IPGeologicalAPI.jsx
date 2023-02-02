import axios from "axios";

const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE.substring(1, 41);

const ipGeologicalAPI = `https://api.ipbase.com/v2/info?apikey=${API_KEY_VALUE}`;

export const IPGeologicalAPI = async () => {
  const { data } = await axios.get(ipGeologicalAPI);
  return data;
};
