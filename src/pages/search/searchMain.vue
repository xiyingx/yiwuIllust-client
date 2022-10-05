<template>
  <div class="search-box">
    <keep-alive include="SearchIndex">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
  
<script>
export default {
  name: 'SearchMain',
  data() {
    return {

    }
  }, created() {

  },
  methods: {

  },
}
</script>
  
<style>
.search-box {
  height: 100%;
  margin-top: 50px;
}
</style>
  