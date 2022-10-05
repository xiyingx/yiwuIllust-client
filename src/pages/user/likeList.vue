<!-- 打印粉丝和关注列表 通用组件 -->
<template>
  <div>
    <print-user :list="likeList">
      <template #col3="scope" v-if="isPerson">
        <el-button v-if="load" class="But-like" size="medium" @click="editLike(scope)">{{scope.user.butText}}
        </el-button>
      </template>
    </print-user>
  </div>
</template>

<script>
  import {likeUser,cancelLikeUser,getLikes} from '@/api/userApi'
export default {
  name: 'likeList',

  data() {
    return {
      load: true,
      isPerson: true, //是否是本人访问 本人访问有权修改
      likeList: [],
      UID: this.$parent.UID
    }
  },
  created() {
    this.getLikes();
    this.$parent.isPerson();
  },
  methods: {
    //局部刷新
    reload() {
      this.load = false;
      this.$nextTick(function () {
        this.load = true;
      });
    },
    async getLikes() {
      const {data:res} =await getLikes(this.UID);
        this.likeList = res.data;
        if (this.likeList != null) {
          this.likeList.forEach(element => {
            element["isLike"] = true;
            element["butText"] = "取消关注";
          });
        }
    },
    //点一下取关 再点一下关注
    async editLike(scope) {
      if (scope.user.isLike) {
        const {data:res} =await cancelLikeUser(scope.user.id,0);
          if (res.data) {
            scope.user.isLike = false;
            scope.user.butText = '关注';
            this.reload();
            this.$message.success('取消关注成功');
          } else {
            this.$message.error('取消关注失败');
          }
      } else {
        const {data:res} =await likeUser(scope.user.id);
          if (res.data) {
            scope.user.isLike = true;
            scope.user.butText = '取消关注';
            this.reload();
            this.$message.success('关注成功');
          } else {
            this.$message.error('关注失败');
          }
      }
    }

  },
}
</script>

<style scoped>
.But-like {
  margin-top: 12px;
  color: #fff;
  box-shadow: 0 0 0 2px #409EFF;
  border-radius: 5px;
  background: #f25d8e;
}
</style>
