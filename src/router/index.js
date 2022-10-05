import Vue from 'vue';
import VueRouter from 'vue-router'
import Index from '@/pages/index/index.vue'
import Star from '@/pages/user/star.vue'
import Illust from "@/pages/index/illust.vue"
import User from '@/pages/login/user.vue'
import Login from '@/pages/login/login.vue'
import Register from '@/pages/login/register.vue'
import Personal from '@/pages/user/personal.vue'
import MyArtis from '@/pages/user/pictureManage/myArts.vue'
import UploadPicture from '@/pages/user/pictureManage/upload.vue'
import EditPicture from '@/pages/user/pictureManage/edit.vue'
import UserIndex from '@/pages/user/userIndex'
import FanList from '@/pages/user/fanList'
import LikeList from '@/pages/user/likeList'
import UserCenter from '@/pages/user/userCenter'
import SearchMain from '@/pages/search/searchMain'
import SearchIndex from '@/pages/search/searchIndex'
import axios from 'axios'
import http from '@/utils/http';
//关闭重复点击路由的警告信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  //定义hash地址与组件的关系
  //路由规则
  routes: [
    { path: '/', redirect: "/index" },
    // 注意不要给子路由加
    { path: '/index', component: Index },
    {
      path: '/search', component: SearchMain, children: [
        { path: '', component: SearchIndex, props: true },
      ]
    },
    { path: '/illust/:id', component: Illust, props: true },

    {
      path: '/userCenter/:UID', component: UserCenter, props: true, children: [
        { path: '', component: Personal },
        { path: 'star', component: Star },
        { path: 'fanList', component: FanList },
        { path: 'likeList', component: LikeList },
        { path: 'userIndex', component: UserIndex },
        {
          path: 'myArts', component: MyArtis, children: [
            { path: 'uploadPicture', component: UploadPicture },
            { path: '', component: EditPicture },
          ]
        },
      ]
    },

    // 注意不要给子路由加"/"
    {
      path: "/user", component: User, children: [
        { path: '', component: Login },
        { path: 'register', component: Register }
      ]
    },
  ]
});
//定义路由守卫
//先为用户检查token，是否有效，有效就继续，无效弹出登录窗口

router.beforeEach((to, from, next) => {
  let url = to.path
  if (url == "/user" || url == "/user/register" || url == "/index" || url.startsWith("/illust") || url.startsWith("/search")) {
    next();
  } else {
    http.get("/codes/checkToken").then((res) => {
      if (res.data.data) {
        //显示头像 并查询用户信息 使得其可以访问
        //   console.log(window.localStorage.getItem("token"));
        next();
      } else {
        next({ path: "/user" })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

});
export default router
