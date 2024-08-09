import axios from "../axios";

export const Categories = () =>
  axios({
    url: "/category/",
    method: "get",
  });
