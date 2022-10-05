<template>
  <div>
    <nav-i ref="navI"></nav-i>
    <transition name="component-fade" mode="out-in">
      <keep-alive include="Index,SearchMain">
        <router-view default="/index" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      
    }
  }, created() {
  },
  methods: {
    reload() {
      this.$refs.navI.getProFile();
    },
  },
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .4s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

/* 总宽 */
.main-box {
  /* width: 1530px; */
  height: 100%;
  /* 响应式宽度 */
  width: calc(100vw - 500px);
  /* 解决抖动问题 即出现滚动条导致页面的偏移 */
  padding-left: calc(100vw - 100%);
  margin: 0 auto;

}
</style>
