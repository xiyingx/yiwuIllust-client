<!-- 导航栏2 -->
<template>
    <nav-my class="pos" :mode="'abs'">
        <nav-item class="float" :index="'/userCenter/'+UID+'/likeList'">
            <span class="nav-text">关注</span>
        </nav-item>
        <nav-item class="float" :index="'/userCenter/'+UID+'/fanList'">
            <span class="nav-text">粉丝</span>
        </nav-item>
        <nav-item class="float" :index="'/userCenter/'+UID+'/userIndex'">
            <span class="nav-text">个人主页</span>
        </nav-item>
        <nav-item class="float" :index="'/userCenter/'+UID">
            <span class="nav-text">个人中心</span>
        </nav-item>
        <nav-item class="float" :index="'/userCenter/'+UID+'/myArts'">
            <span class="nav-text">投稿管理</span>
        </nav-item>
        <nav-item class="float" :enableGet="true" :handleClick="outLogin">
            <span class="nav-text exit-text">退出</span>
        </nav-item>
    </nav-my>
</template>

<script>
import {outLogin} from '@/api/codeApi'
export default {
    name: "NavP",
    data() {
        return {
            
        };
    },
    computed:{
        //使用计算属性 响应式刷新数据
        UID:()=>localStorage.getItem('UID')
    },
    created() {
    },
    methods: {
        async outLogin() {
            const { data: res } = await outLogin()
            if (res.data) {
                //登出移除token和UID
                localStorage.removeItem("token");
                localStorage.removeItem("UID");
                this.$router.push("/index");
                this.$router.go(0);
                this.$message.success(res.code.msg);
            } else {
                this.$message.error(res.code.msg);
            }

        }
    },
}
</script>

<style scoped>
.float {
    float: left;
    margin-right: 10px;
}

.pos {
    top: 20px;
    left: 300px;
}

.nav-text {
    font-size: 15px;
}

.exit-text {
    color: #f25d8e;
    ;
    font-weight: 600;
}
</style>
