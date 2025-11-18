import axios from "axios";
import { config } from "../configs/config";
import { store } from "@/store/store";

export const request = async (url = "", method = "get", data = {}) => {
  const token = store.getState().token;
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  return await axios({
    url: config.base_url + url,
    method: method,
    data: data,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      console.log("Respone data : ", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const responeError = error?.respone;
      if (responeError) {
        const status = responeError?.status;
        if (status === 500) {
          console.log("Error external");
        }
      }
    });
};
