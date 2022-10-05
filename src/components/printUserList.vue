<!-- 打印用户列表的一个组件 -->
<template>
  <div class="fanList-coreContainer">
    <div class="fanList-box">

      <el-row :gutter="20" v-for="(item,index) in list" :key="index">
        <el-col :span="2">
          <div class="fanList-img">
            <el-image :src="'http://localhost/'+item.profile" class="img"></el-image>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="fanList-text">
            <span class="block fanList-text-name">{{item.name}}</span>
            <span class="block fanList-text-des">{{item.description!=null?item.description:'无简介'}}</span>
          </div>
        </el-col>
        <el-col :span="9" class="col-9">
          <slot :user="item" :index="index" name="col3">

          </slot>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: 'userList',
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  },
}
</script>

<style scoped>
.block {
  display: block;
}

.fanList-coreContainer {
  margin-top: 100px;
}

.fanList-box {
  width: 1000px;
  margin: 0 auto;
}

.fanList-text-name {
  margin-top: 5px;
  color: rgb(251, 114, 153);
  font-size: 20px;

}

.fanList-text-des {
  /* margin-top: 10px; */
  line-height: 40px;
  font-size: 12px;
  color: #6d757a
}

.img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

.col-9 {
  text-align: center;
}


/* 占位 */
.el-row {
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
}

/* 动画 */
</style>