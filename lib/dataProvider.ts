import axios from "axios";
import { DataProvider } from "react-admin";

const API_URL = "https://misha-school.vercel.app/api"; // Your Next.js API

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const {title,description,level}=params.filter
    const data = await axios
      .get(`${API_URL}/${resource}?title=${title?title:""}&description=${description?description:" "}&level=${level}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return { data, total: 7 };
  },

  getOne: async (resource, params) => {
    const data = await axios
      .get(`${API_URL}/${resource}/${params.id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return { data };
  },

  create: async (resource, params) => {
    const data = await axios
      .post(`${API_URL}/${resource}`, { data: params.data })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return { data };
  },

  update: async (resource, params) => {
    const data = await axios
      .patch(`${API_URL}/${resource}/${params.id}`, { data: params.data })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return { data };
  },

  delete: async (resource, params) => {
    const data = await axios
      .delete(`${API_URL}/${resource}/${params.id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return { data };
  },

  getMany: async (resource, params) => {
    // console.log(resource,params)
    // need to be corrected
    const data = await axios
      .get(`${API_URL}/${resource}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return {data}
  },
  updateMany: async (resource, params) => {
    const data = await axios
      .get(`${API_URL}/course/get`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
  },
  deleteMany: async (resource, params) => {
    const data = await axios
      .delete(`${API_URL}/${resource}`, {
        data: {ids:params.ids},
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if(data.count){
      return {data:params.ids}
    }
    return {data:[]}
  },
  getManyReference: async (resource, params) => {
    const data = await axios
      .get(API_URL)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
  },
};
export default dataProvider;
