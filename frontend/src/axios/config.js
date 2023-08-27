import axios from "axios";

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.accessToken}`;

export const HTTP = () => {
    const options = {
        baseURL: "http://localhost:5000", 
    }
    const configuredAxios = axios.create(options);
    configuredAxios.interceptors.request.use(function (config) {
    const token = localStorage.accessToken;
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });
return configuredAxios;
}