const user = {
    namespaced: true,
    state:()=>({
        userID:null,
        islogin:false,
        profileSrc:{
            type:String
        }, //头像数据
    }),
    mutations:{
        setIsLogin(state,payload){
            state.islogin = payload;
        },
        setProfile(state,payload){
            state.profileSrc = payload;
        },
        setUserID(state,payload){
            state.userID = payload;
        },
    },
    getters: {
        getIslogin(state){
            return state.islogin;
        },
        getProfile(state){
            return state.profileSrc;
        },
        getUserID(state){
            return state.userID ||localStorage.getItem('UID')
        }
    },
    actions:{

    }
}

export default user