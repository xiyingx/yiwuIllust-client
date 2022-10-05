import http from "@/utils/http";
//userID从token里面拿

export const getStars = ()=>http.get("/star")

export const createStar = (star)=>http.post("/star",star)

export const removeStar = (star)=>http.post("/star/delStar",star)
//从收藏夹页面操作移除图片
export const removeIllustFromStar = (star,illustID)=>http.post("/star/unStar/"+illustID,star)

export const editStar = (star)=>http.post("/star/saveInfo",star)

// 收藏
export const star = (illust,starID)=>http.put("/star/"+starID,illust)
export const unStar = (illustID)=>http.get("/star/unStar",{params:{illustID:illustID}})
// 点赞
export const like = (illustID)=> http.get("/illust/like/"+illustID)
export const cancelLike = (illustID)=>http.get("/illust/cancelLike/"+illustID)

//登录 注册...
export const register = (user)=>http.post("/user/register",{user:JSON.stringify(user)})
export const login = (user)=>http.post("/user/login",{user:JSON.stringify(user)})

export const getProfile = ()=>http.get("/user/getProfile")

export const getUserInfo = ()=>http.get("/user/getUserInfo")

export const updateUser = (user)=>http.post("/user/updateInfo",user)

export const getUserIndex = (userID)=>http.get("/user/getUserIndex/"+userID)

export const getFans = (userID)=>http.get("/user/getFans/"+userID)

export const getLikes = (userID)=>http.get("/user/getLikes/"+userID)

export const likeUser = (likeUserID)=>http.get("/user/like/"+likeUserID);
export const cancelLikeUser = (likeUserID,op)=>http.get("/user/cancelLike/"+likeUserID+"/"+op);