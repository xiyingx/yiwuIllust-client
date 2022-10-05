import http from "@/utils/http";

export const checkToken = ()=>http.get("/codes/checkToken")

export const outLogin = ()=>http.get("/user/outLogin")

