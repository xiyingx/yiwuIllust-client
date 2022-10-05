<!-- 打印传递的图片 -->
<template>
    <div v-if="enableWaterFall" id="cc1" fit-width="false" v-masonry transition-duration="0.3s" item-selector=".item"
        destroy-delay="400">
        <div v-masonry-tile class="item" v-for="(item, index) in illustList" :key="index">
            <div>
                <slot :illust="item" :index="index" name="header"></slot>
            </div>
            <div class="img-partent"  @click="getDetail(item)">
                <div :class="imgMaskClass">
                    <h2>{{item.name}}</h2>
                </div>
                <img :class="imgClass" :src="'http://localhost/'+item.src" :key="item.src">
            </div>
        </div>
    </div>

    <div v-else id="cc1">
        <div class="item-2" v-for="(item, index) in illustList" :key="index">
            <div>
                <!-- 向外传递两个可以传递多个 -->
                <slot :illust="item" :index="index" name="header"></slot>
            </div>
            <img class="image-2" :src="'http://localhost/'+item.src" :key="item.src" @click="getDetail(item)">
        </div>
    </div>

</template>

<script>
export default {
    name: 'picturePrint',
    props: {
        enableWaterFall: { //是否开启瀑布流
            default: true,
            type: Boolean
        },
        illustList:{
            type:Array
        },
        enableScale:{ //是否开启图片缩放
            default:false,
            type: Boolean
        }
    },
    data() {
        return {
            imgClass:"image",
            imgMaskClass:"img-mask"
        }
    }, created() {
        this.enableScaleTo();

    },
    activated() {
        this.enableScaleTo();
    },
    methods: {
        getDetail(item) {
            this.$router.push("/illust/" + item.id);
        },
        enableScaleTo(){
            if(this.enableScale){
                this.imgClass = "imgEnable";
            }
        }
    },
}
</script>

<style scoped>
.image {
    width: 330px;
    border-radius: 20px;
    /* transform: scale(1.04); */
	transition: all 0.6s;
    display: block;
}

.img-partent{
    position: relative;
}
.img-mask{
     /* 隐藏遮罩层 */
    display: none;
    /* 子绝父相 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    border-radius: 10px;
    color:white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 6;
}

.imgEnable{
    width: 330px;
    border-radius: 10px;
    display: block;
    /* transform: scale(1.0); */
}

.img-partent:hover .image{
    transform:scale(1.3);
}
.img-partent:hover .img-mask{
    display: flex;
}

.item {
    float: left;
    margin: 7px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .18);
    border-radius: 20px;
    overflow: hidden;
    width: 330px;
}

.item-2 {
    float: left;
    margin: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 10px;
}

.image-2 {
    cursor: pointer;
    width: 330px;
}
</style>
