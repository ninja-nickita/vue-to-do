import axios from "axios";

axios.defaults.baseURL = "https://hiring-example-25770.botics.co/rest-auth";

export const login = async credentials => {
  try {
    return await axios.post("/login/", credentials);
  } catch (e) {
    return e.response;
  }
};

export const logout = async () => {
  try {
    await axios.post("/logout/");
  } catch (e) {
    return e.response;
  }
};

export const register = async credentials => {
  try {
    return await axios.post("/registration/", credentials);
  } catch (e) {
    return e.response;
  }
};

export const resetPassword = async email => {
  try {
    return await axios.post("/password/reset/", { email });
  } catch (e) {
    return e.response;
  }
};

export const changePassword = async password => {
  try {
    return await axios.post("/password/change/", password);
  } catch (e) {
    return e.response;
  }
};

export const getUser = async () => {
  try {
    return await axios.get("/user/");
  } catch (e) {
    return e.response;
  }
};

export const updateUser = async data => {
  try {
    return await axios.put("/user/", data);
  } catch (e) {
    return e.response;
  }
};
