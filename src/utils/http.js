import axios from "axios";

const http = axios.create({
    baseURL:"http://localhost/",
    withCredentials:true,
    headers:{token:localStorage.getItem("token")},
})
//增加拦截器 解决token不刷新的问题
http.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("token");
      token && (config.headers.token = token);
      return config;
    },
    (error) => {
      return Promise.reject("error");
    }
  );
export default http