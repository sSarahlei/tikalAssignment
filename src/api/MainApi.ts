import { apiRequest } from "./Api";

export const getInfo = async (type: ResourceType, page?: number) => {
  let params = page ? { page } : {};
  return apiRequest("get", type, { params });
};

export const getById = async (type: ResourceType, id: number) => {
  return apiRequest("get", type + "/" + id);
};

export const getByIds = async (type: ResourceType, ids: Array<number>) => {
  return apiRequest("get", type + "/" + ids);
};

export const getByParams = async (type: ResourceType, params = {}) => {
  return apiRequest("get", type, { params });
};
