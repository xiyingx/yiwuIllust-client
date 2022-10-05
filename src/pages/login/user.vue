<!-- 用户 登录注册组件 -->
<template>
  <div class="all">
    <div id="box2">
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- 负责切换登录 or 注册 -->
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'user',
  data() {
    return {

    }
  }, created() {

  },
  methods: {

  },
}
</script>
  
<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .4s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.all {
  position: relative;
  height: 100vh;
  background-image: url("@/assets/backgounrdImg/bg1.jpg");
  /* 把背景图片往上拉 */
  background-position: 0 -150px
}

#box2 {
  position: absolute;
  width: 500px;
  height: 400px;

  /* 用这个可以实现定位完美居中 不知道为什么 */
  transform: translate(-50%, -50%);
  left: 50%;
  top: 45%;

  /* margin: 200px auto; */
}
</style>