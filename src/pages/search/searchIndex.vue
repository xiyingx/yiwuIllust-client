<template>
    <div class="core-2 main-box">

        <div class="search-logo">
            <IconSvg icon-name="round" class="logo-size"></IconSvg>
        </div>
        <!-- 直接绑div差不多得了😓 -->
        <div class="input-box" @keyup.enter="isValid">
            <el-input v-model="keyword" placeholder="输入搜索内容">
                <el-select v-model="mode" slot="prepend" class="select">
                    <el-option label="插画名" :value="1"></el-option>
                    <el-option label="标签分类" :value="2"></el-option>
                    <el-option label="画师" :value="3"></el-option>
                </el-select>
                <el-button class="bt1" slot="append" icon="el-icon-search" @click="isValid">搜索</el-button>
            </el-input>
        </div>

        <div class="pic-box">
            <print-pic v-if="isRouterAlive" :illustList="illustList"></print-pic>
        </div>
        <!-- 设置一个加载动画 -->
        <div class="temp" v-loading="loading"></div>

    </div>
</template>

<script>
/* 必须导入 不知道为啥 */
import IconSvg from '@/components/IconSvg.vue';
import {simpleSearch} from'@/api/illustApi'
export default {

    name: 'SearchIndex',
    components: { IconSvg },

    data() {
        return {
            keyword: null,
            mode: 1, //默认选第一个
            illustList: [],
            currentPage: 1,
            totalPage: 1,
            count: 0,
            loading: false,
            oldMode: -1,
            oldKeyword: '',
            isRouterAlive: true
            // opt:this.$route.query.opt,
        }
    }, created() {

    },
    mounted() {
        window.onscroll = this.handleScroll;
    },
    destroyed() {
        console.log("被销毁");
    },
    activated() {
        this.reload();
        window.onscroll = this.handleScroll;
        this.checkParam();
    },
    deactivated() {
        window.onscroll = null;
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
        // change(){
        //     this.$router.push({path: '/search', query:{opt: 'bb'}});
        // }
        //滚动条滚动函数
        handleScroll() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                if (this.currentPage >= this.totalPage) {
                    console.log("触底了");
                } else {
                    this.loading = true;
                    this.currentPage++;
                    //防止请求过快
                    setTimeout(() => {
                        this.search();
                    }, 500);
                }
            }
        },
        isValid() {
            if (this.keyword != null && this.keyword != '' && this.keyword != ' ') {
                console.log('old:' + this.oldKeyword + "," + this.oldMode);
                console.log('new:' + this.keyword + "," + this.mode);
                if (this.keyword != this.oldKeyword || this.mode != this.oldMode) {
                    this.illustList = [];
                    this.currentPage = 1; //重置页码和数据
                    this.search();
                } else {
                    console.log("直接滑滚轮看把 别查了");
                    return;
                }
            }
        },
        async search() {
            const {data:res} =await simpleSearch(this.currentPage,this.keyword,this.mode)
                console.log(res);
                if (res.data != null) {
                    this.illustList = this.illustList.concat(res.data.illust);
                    this.totalPage = res.data.totalPage;
                    this.count = res.data.count;
                    this.oldKeyword = this.keyword;
                    this.oldMode = this.mode;
                    this.loading = false;
                }
        },
        checkParam(){
            if(this.$route.query.mode!=null && this.$route.query.keyword!=null){
                this.mode = Number(this.$route.query.mode);
                this.keyword = this.$route.query.keyword;
                this.isValid();
                this.$route.query.mode = null;
                this.$route.query.keyword = null;
            }

        }
    },
}
</script>

<style scoped>
.search-logo {
    text-align: center;
    margin-bottom: 20px;
}

.logo-size {
    font-size: 100px;

}

.input-box {
    width: fit-content;
    margin: 0 auto;
}

.el-input {
    width: 1000px;
}

.select {
    width: 110px;

}
.pic-box{
    margin-top: 20px;
}
.el-select {
    background-color: #fc8bab;
    color: #fff;
    border-radius: 15px 0 0 15px;
}

.input-box /deep/ .el-input-group__prepend {
    border: 0px;
    background-color: #fff;
}

.el-input /deep/ .el-input__icon {
    color: #fff;
}

.input-box /deep/ .el-input-group__append {
    border: 0px;
}

.input-box .el-button {
    background-color: #409EFF;
    color: #fff;
    border-radius: 0 15px 15px 0;
}

.input-box .el-button:hover {
    background-color: #6aaef3;
}
</style>
