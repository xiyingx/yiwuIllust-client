<template>
  <div>
    <print-user :list="fanList">
      <template #col3="scope" v-if="isPerson">
        <el-button class="But-like" size="medium" @click="removeFan(scope)">{{butText}}</el-button>
      </template>
    </print-user>
  </div>
</template>

<script>
  import {getFans,cancelLikeUser} from '@/api/userApi'
export default {
  name: 'FanList',
  data() {
    return {
      isPerson: true, //是否是本人访问 本人访问有权修改
      butText: "移除粉丝",
      fanList: [],
      UID: this.$parent.UID
    }
  },
  created() {
    this.getFansList();
    this.$parent.isPerson();
  },
  methods: {
    async getFansList() {
      const {data:res} =await getFans(this.UID);
      if (res.data) {
        this.fanList = res.data;
      }
    },
    async removeFan(scope) {
      const {data:res} =await cancelLikeUser(scope.user.id,1)
        if (res.data) {
          this.fanList.splice(scope.index, 1);
          this.$message.success('移除成功');
        } else {
          this.$message.error('移除失败');
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
