<template>
  <div class="core-box">
    <div class="bg">
      <div class="header-box">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="3">
            <img :src="'http://localhost/'+user.profile" class="img float-left"/>
          </el-col>
          <el-col :span="5">
            <div class="img-box-text float-left">
              <h1>{{user.name}}</h1>

              <div class="img-box-1" @click="getThisFans">
                <span class="img-box-text-1">粉丝数：<span class="img-box-text-2">{{user.countFanUser}}</span></span>

              </div>

              <div class="img-box-1" @click="getThisLikes">
                <span class="img-box-text-1">关注数：<span class="img-box-text-2">{{user.countLikeUser}}</span> </span>

              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="like">
              <el-button round :disabled="isEnable" class="like-bt" @click="like">{{likeText}}</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 第二行 -->


      </div>
    </div>

    <!-- 用来显示图片 推荐与全部的图片 -->
    <div class="body-class">
      <el-row :gutter="2" class="header-box-row2">
        <el-col :span="12">
          <div class="but-box">

            <el-button @click="shiftRecommand">推荐</el-button>

          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-button @click="shiftAll">全部</el-button>
          </div>
        </el-col>
      </el-row>
      <transition name="fade">
        <print-pic v-if="load" :illustList="currentList"></print-pic>
      </transition>


    </div>
  </div>
</template>

<script>
  import {getUserIndex,likeUser,cancelLikeUser} from '@/api/userApi'
export default {
  name: 'userIndex',
  data() {
    return {
      isEnable: false,
      likeText: '关注',
      isLike: false,
      load: true,
      currentList: [],
      allIlust: [],
      recommend: [],
      user: {},
      UID: this.$parent.UID
    }
  },
  created() {
    this.getIndex();
    //调用 是否是本人 本人就显示导航栏
    this.$parent.isPerson();
  },
  methods: {
    reload() {
      this.load = false;
      setTimeout(() => {
        this.load = true;
      }, 500);
    },
    async getIndex() {
      const {data:res} = await getUserIndex(this.UID);
      this.user = res.data.user;
      if (res.data.userIndex) {
        this.user.countFanUser = res.data.userIndex.countFanUser;
        this.user.countLikeUser = res.data.userIndex.countLikeUser;
        if (res.data.userIndex.fanUser) {
          this.user.fanUser = res.data.userIndex.fanUser;
        }
      }
      if(!this.user.fanUser){
        this.user.fanUser = []
      }
      if (res.data.illusts) {
        this.allIlust = res.data.illusts;
        this.currentList = res.data.illusts;
      }
      if (res.data.recommend) {
        this.recommend = res.data.recommend;
      }
      
      if (this.user.fanUser.indexOf(localStorage.getItem('UID')) != -1) {
        this.isLike = true;
        this.likeText = '取消关注';
      }
      if (this.UID === localStorage.getItem('UID')) {
        this.isEnable = true;
      }
    },

    shiftRecommand() {
      this.currentList = this.recommend;
      this.reload();
    },
    shiftAll() {
      this.currentList = this.allIlust;
      this.reload();
    },
    async like() {
      if (this.isLike) {
        const {data:res} =await cancelLikeUser(this.UID,0)
          if (res.data) {
            this.isLike = false;
            this.likeText = '关注';
            this.user.countFanUser--;
            this.$message.success('取消关注成功');
          } else {
            this.$message.error('取消关注失败');
          }
      } else {
        const {data:res} =await likeUser(this.UID)
        console.log(res);
          if (res.data) {
            this.isLike = true;
            this.likeText = '取消关注';
            this.user.countFanUser++;
            this.$message.success('关注成功');
          } else {
            this.$message.error('关注失败');
          }
      }
    },
    getThisFans() {
      this.$router.push('/userCenter/' + this.UID + '/fanList');
    },
    getThisLikes() {
      this.$router.push('/userCenter/' + this.UID + '/likeList');
    }
  },
}
</script>

<style scoped>
.core-box {
  margin-top: 2px;
}

.header-box {
  width: 700px;
  height: 300px;
  margin: 0 auto;
}

.bg {
  background-size: 100% 100%;
  /* background-color: #409EFF; */
  /* background-image: url("http://localhost/img/c9e441b5843b4e33bcbe46ae21a4e6c5.jpeg"); */
}

.body-class {
  width: 1530px;
  margin: 0 auto;
}

.like {
  text-align: right;
  margin-top: 25px;
}

.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.img-box-text {
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  width: 100px;

}

.but-box {
  text-align: right;
}

.el-row {
  margin-bottom: 20px;
}

.header-box-row2 {
  margin-top: 5px;
}

.like-bt {
  background: #ff85ad;
  color: #fff;
}

.like-bt:hover {
  background-color: #f79ab9;
}

.img-box-text-2 {
  color: black;
}

.img-box-text-1:hover {
  cursor: pointer;
  color: #00a1d6;
}

.img-box-1 {
  font-size: 12px;
}

.img-box-text-1 {
  color: #99a2aa;
}

/*  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>
