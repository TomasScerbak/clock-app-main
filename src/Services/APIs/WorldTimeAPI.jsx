import axios from "axios";

const worldTimeAPI = "http://worldtimeapi.org/api/ip";

export const WorldTimeAPI = async () => {
  const { data } = await axios.get(worldTimeAPI);
  return data;
};
