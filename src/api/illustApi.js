import http from "@/utils/http";

export const getIllustByPage =(page)=>http.get("/illust/get/"+page);

export const getOneIllust = (id)=>http.get("/illust/getOne/"+id);

export const getIllustByUser = (userID)=>http.get("/illust/getUserIllust/"+userID)

export const updateIllust = (illust)=>http.put("/illust",illust)

export const delIllust = (illustID)=>http.delete("/illust/"+illustID);

export const simpleSearch = (page,keyword,mode)=>http.get("/illust/search",{params:{page:page,keyword:keyword,mode:mode}});