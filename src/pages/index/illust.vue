<template>
    <div class="illust-box-main">
        
        <div class="illust-box">

            <el-row :gutter="20" type="flex">
                <el-col :span="18" class="illust-img-c1">
                    <img class="pic-img" :src="'http://localhost/'+illust.src" alt="">
                </el-col>
                <el-col :span="6" class="el-c2">
                    <div class="ill-title des">
                        <h1>{{illust.name}}</h1>
                        <span>#{{illust.description}}</span>
                    </div>

                    <div class="tags des">
                        <el-tag class="tag" v-for="(item,index) in illust.tags" :key="index" @click="goSearch(item)">
                            {{item}}</el-tag>
                    </div>

                    <div class="profile des" @click="getAuthorIndex">
                        <img :src="authorProfile">
                        <h1>{{illust.author}}</h1>
                    </div>

                    <div class="countInfo des">
                        <IconSvg iconName="star-off">{{illust.countStarUser}}</IconSvg>
                        <IconSvg iconName="like-off">{{illust.countLikeUser}}</IconSvg>
                        <span>{{illust.createdDate}}</span>
                    </div>
                    <div class="op des" v-if="isLogin">
                        <IconSvg :iconName="icClass2" @click="like"></IconSvg>
                        <IconSvg :iconName="icClass" @click="openDiglog"></IconSvg>
                    </div>
                    <div class="download des">
                        <el-button @click="download">下载</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog title="选择收藏夹" :visible.sync="starDialogVisible" width="30%" center>
            <el-radio-group v-model="optStar">
                <el-radio :label="item" v-for="(item,index) in stars" :key="index">
                    {{item.name}}
                </el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="starDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStar">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import IconSvg from '@/components/IconSvg.vue';
import {getOneIllust } from '@/api/illustApi';
import http from '@/utils/http';
import {getStars,star,unStar,like,cancelLike,createStar} from '@/api/userApi'
import { mapGetters } from 'vuex';
export default {
    name: "myDetail",
    //接受插画ID 进行查询详情
    props: ["id"],
    data() {
        return {
            icClass2: "like-off",
            icClass: "star-off",
            starDialogVisible: false,
            illust: {},
            optStar:{},
            stars:[],
            authorProfile: "http://localhost/",
            isStar: false,
            isLike: false
        };
    },
    computed:{
        ...mapGetters("user",{isLogin:["getIslogin"]})
    },
    created() {
        this.getIllust();
    },
    destroyed() {
    },
    methods: {
        //获取插画
        async getIllust() {
            const { data: res } = await getOneIllust(this.id);
            this.illust = res.data.illustRes.illust;
            this.isStar = res.data.illustRes.isStar;
            this.isLike = res.data.illustRes.isLike;
            this.authorProfile += res.data.profilePictureURL;
            if (this.isStar) {
                this.icClass = "star-on";
            }
            else {
                this.icClass = "star-off";
            }
            if (this.isLike) {
                this.icClass2 = "like-on";
            }
            else {
                this.icClass2 = "like-off";
            }
        },
        //查询用户收藏夹 并判断是否收藏 收藏了再点就取消收藏
        async openDiglog() {
            if (this.isStar) {
                const { data: res } = await unStar(this.illust.id);
                if (res.data) {
                    this.icClass = "star-off";
                    this.illust.countStarUser--;
                    this.isStar = false;
                    this.$message.success("取消成功");
                }else{
                    this.$message.error("取消失败");
                }//否则获取到收藏夹打印 让用户选择收藏进那个
            }else{
                const { data: res } = await getStars();
                //查不到给他建个默认的
                if (res.data==null) {
                   const {data:res} = await createStar({name:"默认收藏夹",isShow:true})
                   this.stars.push(res.data);
                }else{
                    this.stars = res.data;
                }
                this.optStar = this.stars[0];//默认选中第一个
                this.starDialogVisible = true;
            }
        },
        //添加到收藏夹
        async addStar(){
            const { data: res } = await star(this.illust,this.optStar.id)
            if (res.data) {
                    this.icClass = "star-on";
                    this.$message.success("收藏成功");
                    this.isStar = true;
                    this.illust.countStarUser++;
                    this.starDialogVisible = false;
                }else{
                    this.$message.error("收藏失败");
                }
        },
        //点赞
        async like() {
            if (this.isLike) {
                const { data: res } = await cancelLike(this.illust.id);
                if (res.data) {
                    this.icClass2 = "like-off";
                    this.isLike = false;
                    this.illust.countLikeUser--;
                    this.$message.success("取消成功");
                }else{
                    this.$message.error("取消失败");
                }//否则获取到收藏夹打印 让用户选择收藏进那个
            }else{
                const { data: res } = await like(this.illust.id);
                if (res.data) {
                    this.icClass2 = "like-on";
                    this.isLike = true;
                    this.illust.countLikeUser++;
                    this.$message.success("点赞成功");
                }else{
                    this.$message.error("点赞失败");
                }//否则获取到收藏夹打印 让用户选择收藏进那个
            }
            
        },
        getAuthorIndex() {
            this.$router.push("/userCenter/" + this.illust.authorUID + "/userIndex");
        },

        downloadPic(res) {
            const blob = new Blob([res.data]);//处理文档流
            const fileName = this.illust.src;
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            const url = URL.createObjectURL(blob);
            elink.href = url;
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
        },
        download() {
            http.get("/illust/download", {
                responseType: 'blob',
                params: {
                    src: this.illust.src
                }
            }).then((res) => {
                this.downloadPic(res)
            });
        },
        //跳转到搜索页按标签搜
        goSearch(tag) {
            this.$router.push({ path: '/search', query: { mode: 2, keyword: tag } });
        }
    },
    components: { IconSvg }
}
</script>

<style scoped>
.ill-title {
    line-height: 50px;
    border-bottom: 1px solid #DCDFE6;
}

.ill-title h1 {
    letter-spacing: 2px;
}

.ill-title span {
    color: #606266;
    font-size: 15px;
}

.op {
    text-align: center;
}

.op .svg-box {
    cursor: pointer;
    font-size: 30px;
    margin-right: 20px;
}

.el-c2 {
    border-left: 1px solid #DCDFE6;
}

.countInfo {
    color: #606266;
}

.countInfo span {
    line-height: 30px;
    display: block;
    font-size: 15px;
}

.tag {
    cursor: pointer;
}

.pic-img {
    width: 100%;
    height: 100%;
    /* 制造立体感 */
    box-shadow: 0 0 8px rgba(0, 0, 0, .18);
}

.illust-img-c1 {
    width: fit-content;
    height: calc(100vh - 100px);
    margin: 0 auto;

}

.pic-img,
.illust-img-c1 {
    border-radius: 20px;
}

.profile {
    cursor: pointer;
}

.profile img {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
}

.profile h1 {
    display: inline-block;
    vertical-align: 30px;
    color: #f25d8e;
}

.countInfo .svg-box {
    margin-right: 10px;
}

.des {
    margin-bottom: 20px;
}

.download {
    text-align: center;
}

.illust-box-main {
    padding: 40px;
}

/* 占位 */
</style>