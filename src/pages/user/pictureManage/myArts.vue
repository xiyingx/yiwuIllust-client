<template>
  <el-main>
    <el-menu class="el-menu-1" mode="horizontal" text-color="#00AEEC" active-text-color="#FFB6C1" :router="true"
      :default-active="'/userCenter/'+UID+'/myArts/'">
      <el-menu-item :index="'/userCenter/'+UID+'/myArts/'"><span class="menu-item-text">编辑</span> </el-menu-item>
      <el-menu-item :index="'/userCenter/'+UID+'/myArts/uploadPicture'"><span class="menu-item-text">上传</span>
      </el-menu-item>
    </el-menu>
    <div class="compo-box">
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </el-main>
</template>
  
<script>

export default {
  name: 'myArt',
  data() {
    return {
      UID: this.$parent.UID,

    }
  }, created() {

  },
  methods: {

  },
}
</script>
  
<style scoped>
.el-menu-1 {
  margin-top: 20px;
  width: 160px;
  margin: 0 auto;
}

.menu-item-text {
  font-size: 18px;
}

.compo-box {
  margin-top: 100px;
}
</style>
  