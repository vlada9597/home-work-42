import axios from "axios";

export const fetchData = async (url, id) => {
  const fullUrl = id ? `${url}/${id}` : url;
  const response = await axios.get(fullUrl);
  return response.data;
};
