import axios, { AxiosRequestConfig } from "axios";
import ApiInterceptorService from "./ApiInterceptor";

const getBaseUrl = () => {
  return "https://rickandmortyapi.com/api/";
};

const setApiConfig = () => {
  axios.defaults.baseURL = getBaseUrl();
};

const apiRequest = async (
  method = "",
  url = "",
  options: AxiosRequestConfig = {}
) => {
  setApiConfig();
  const { params = {}, data = {} } = options;
  const interceptor = new ApiInterceptorService();
  try {
    switch (method) {
      case "get":
        return get(url, params);
      case "post":
        return post(url, params, data);
      case "put":
        return put(url, params, data);
      case "delete":
        return del(url, params);
    }
  } finally {
    interceptor.removeInterceptor();
  }
};

const get = async (url: string = "", params: any = {}) => {
  return axios.get(url, { params });
};

const post = async (url: string = "", params: any = {}, data: any = {}) => {
  return axios.get(url, { params, data });
};

const put = async (url: string = "", params: any = {}, data: any = {}) => {
  return axios.get(url, { params, data });
};

const del = async (url: string = "", params: any = {}, data: any = {}) => {
  return axios.get(url, { params, data });
};

export { setApiConfig, apiRequest, get, post, put, del, getBaseUrl };
