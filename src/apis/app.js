import axios from "axios";

const defaultOptions = {
  baseURL: "https://hiring-example-25770.botics.co/api/v1"
};

export const appsList = async () => {
  try {
    return await axios.get("/apps/", { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const createApp = async appInfo => {
  try {
    return await axios.post("/apps/", appInfo, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const getApp = async id => {
  try {
    return await axios.get(`/apps/${id}`, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const updateApp = async data => {
  try {
    const appId = data.get("id");
    return await axios.put(`/apps/${appId}`, data, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const deleteApp = async id => {
  try {
    return await axios.delete(`/apps/${id}`, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const plansList = async () => {
  try {
    return await axios.get(`/plans/`, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const getPlan = async id => {
  try {
    return await axios.get(`/plans/${id}`, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const subscriptionsList = async () => {
  try {
    return await axios.get(`/subscriptions/`, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const createSubscription = async data => {
  try {
    return await axios.post(`/subscriptions/`, data, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const getSubscription = async id => {
  try {
    return await axios.get(`/subscriptions/${id}`, { ...defaultOptions });
  } catch (e) {
    return e.response;
  }
};

export const updateSubscription = async data => {
  try {
    return await axios.put(`/subscriptions/${data.id}`, data, {
      ...defaultOptions
    });
  } catch (e) {
    return e.response;
  }
};
