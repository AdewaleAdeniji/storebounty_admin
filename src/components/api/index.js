import axios from "axios";
import config from "../../config";

const token = localStorage.getItem('authT');

const PR = (response) => {
  //console.log(response?.status);
  if (response?.status === 401) {
    // eslint-disable-next-line no-return-assign
    return (window.location.href = "/logout");
  }
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export const login = async (email, password) => {
  try {
    const payload = { email, password, client_id: config.client_id };
    const res = await axios.post(`${config.base_url}/accounts/api/v1/auth/admin/token`, payload);
    return res;
  } catch (err) {
    if (err?.response) {
      return err?.response;
    }
    return err;
  }
};
export const getUsers =  async (page, size) => {
    const res = await getter(`${config.base_url}/accounts/api/v1/report/users?page=${page}&size=${size}`,token);
    return PR(res);
}
export const getBusinesses =  async (page, size) => {
  const res = await getter(`${config.base_url}/accounts/api/v1/report/businesses?page=${page}&size=${size}`,token);
    return PR(res);
}
export const poster = async (url, payload, token) => {
  try {
    const post = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${token}` , "clientId":config.client_id },
    });
    return post;
  } catch (err) {
    if (err?.response) {
      return err?.response;
    }
    return err.response;
  }
};
export const getter = async (url, token) => {
  //console.log(url, token);
  try {
    const post = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}`, "clientId":config.client_id },
    });
    return post;
  } catch (err) {
    if (err?.response) {
      return err?.response;
    }
    return err;
  }
};
