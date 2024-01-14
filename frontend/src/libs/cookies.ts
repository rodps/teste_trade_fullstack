import Cookies from "js-cookie";

const storeJWT = (token: string) => {
  Cookies.set("token", token);
};

const getJWT = () => Cookies.get("token");

const deleteJWT = () => Cookies.remove("token");

const cookies = {
  storeJWT,
  getJWT,
  deleteJWT,
};

export { cookies };
