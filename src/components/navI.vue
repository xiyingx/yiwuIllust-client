<!-- 导航栏 -->
<template>
    <nav-my class="pos" v-draggable>
        <nav-item class="size" :index="'/search'">
            <IconSvg icon-name="search" class="search-icon icon-size "></IconSvg>
        </nav-item>
        <nav-item class="size" :index="'/index'">
            <IconSvg icon-name="round" class="index-ico icon-size"></IconSvg>
        </nav-item>
        <nav-item class="size" :index="'/userCenter/'+UID">
            <IconSvg v-if="!islogin" icon-name="person" class="person-ico icon-size"></IconSvg>
            <img v-else class="proFileSize" :src="profile" alt="">
        </nav-item>
        <nav-item class="size" :index="'/userCenter/'+UID+'/star'">
            <IconSvg icon-name="star" class="person-ico icon-size"></IconSvg>
        </nav-item>
        <nav-item class="size" :back="true">
            <IconSvg icon-name="return" class="return-ico icon-size"></IconSvg>
        </nav-item>
    </nav-my>
</template>

<script>
import IconSvg from './IconSvg.vue';
import draggable from '@/assets/domjs/draggable'
import { getProfile } from '@/api/userApi'
import { mapGetters, mapMutations } from 'vuex';
import { checkToken } from '@/api/codeApi'
export default {
    name: "NavI",
    directives: { draggable },
    components: { IconSvg },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters("user", { islogin: ["getIslogin"], profile: ["getProfile"], UID: ["getUserID"] }),
    },
    created() {
        this.autoLogin();
        this.getProFile();
    },
    methods: {
        ...mapMutations("user", ["setIsLogin"]),
        ...mapMutations("user", ["setProfile"]),
        //自动登录
        async autoLogin() {
            if (!this.islogin) {
                const { data: res } = await checkToken()
                if (res.data) {
                    this.setIsLogin(true)
                } else {
                    this.$message.warning("请先登录");
                }
            }
        },
        async getProFile() {
            const { data: res } = await getProfile();
            let proFilePictureUrl = "http://localhost/" + res.data;
            this.setProfile(proFilePictureUrl)
        },
    },
}
</script>

<style scoped>
.pos {
    top: 20px;
    left: 20px;
    z-index: 7;
}

.size {
    width: 30px;
    height: 30px;
}

.size :deep() .svg-icon {
    margin: 0;
}

.proFileSize {
    width: 30px;
    height: 30px;
    border-radius: 30px;
}

.icon-size {
    font-size: 22px;
}

.index-ico {
    height: 25px;
}

.search-icon {
    font-size: 20px;
}

.person-ico {
    color: #000;
}

.return-ico {
    font-size: 15px;
    color: #000;
}
</style>
