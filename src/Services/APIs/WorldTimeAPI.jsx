import axios from "axios";

const worldTimeAPI = "https://worldtimeapi.org/api/ip";

export const WorldTimeAPI = async () => {
  const { data } = await axios.get(worldTimeAPI);
  return data;
};
