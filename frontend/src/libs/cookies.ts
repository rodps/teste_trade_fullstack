import Cookies from "js-cookie";

const storeJWT = (token: string) => {
  Cookies.set("token", token, { expires: 1 });
};

const getJWT = () => Cookies.get("token");

const deleteJWT = () => Cookies.remove("token");

const cookies = {
  storeJWT,
  getJWT,
  deleteJWT,
};

export { cookies };
