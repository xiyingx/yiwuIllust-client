<template>
  <div class="main-box">
    <!-- 打印全部图片  不重加载会出现瀑布流失效bug 可能因为其 和个人主页冲突！-->
    <print-pic v-if="isRouterAlive" :illustList="illustList"></print-pic>
    <!-- 设置一个加载动画 -->
    <div class="temp" v-loading="loading"></div>
  </div>
</template>
  
<script>
import {getIllustByPage} from '@/api/illustApi'
export default {
  name: 'Index',
  data() {
    return {
      illustList: [],
      currentPage: 1,
      MaxPage: 1,
      pageSize: 10,
      loading: true,
      isRouterAlive: true,
      rollderHist: 0
    }
  },
  mounted() {
    window.onscroll = this.handleScroll;
  }, created() {
    this.getIndex();
  },
  destroyed() {

  },
  activated() {
    this.reload();
  },
  deactivated() {
    window.onscroll = null;
  },
  methods: {
    //滚动条滚动函数
    handleScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      this.rollderHist = scrollTop;
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        if (this.currentPage >= this.MaxPage) {
          console.log("触底了");
        } else {
          this.loading = true;
          this.currentPage++;
          //防止请求过快
          setTimeout(() => {
            this.getIndex();
          }, 500);
        }
      }
    },
    async getIndex() {
      const {data:res} = await getIllustByPage(this.currentPage);
      if (res.data.illust) {
        this.illustList =this.illustList.concat(res.data.illust);
        this.MaxPage = res.data.totalPage;
        this.loading = false;
      }
      
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
      //必须设置延迟 因为前面异步了 nextTick比setTimeout先执行
      //此时只需要让设置滚动条比刷新后执行即可
      setTimeout(() => {
        document.documentElement.scrollTop = this.rollderHist;
        document.body.scrollTop = this.rollderHist;
        window.onscroll = this.handleScroll;
      });
    },
  }
}
</script>
  
<style scoped>
.temp {
  height: 100px;
}
</style>
  