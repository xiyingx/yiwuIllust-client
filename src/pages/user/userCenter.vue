<template>
  <div class="core-center main-box">
    <nav-p v-if="isEnable"></nav-p>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
  
<script>
export default {
  name: 'UserCenter',
  props: ['UID'],
  data() {
    return {
      isEnable: true,
    }
  }, created() {

  },
  activated() {

  },
  methods: {
    isPerson() {
      if (this.UID != localStorage.getItem('UID')) {
        this.isEnable = false;
      } else {
        this.isEnable = true;
      }
    }
  },
}
</script>
  
<style scoped>
.core-center {
  margin-top: 100px;
}
</style>
  