/**
* @Description: 关于我
* @Author: wanggang
* @Date: 2020-08-04 20:30:18
**/
<template>
    <div class="about">
        <!-- <HeaderImg :url="'/static/img/water-1761027.jpg'"></HeaderImg> -->
        <div class="intro-title con">自我介绍</div>
        <div class="about-top con">
            <div class="self">
                <div class="head">
                    <img src="https://chefwang.oss-cn-shanghai.aliyuncs.com/images/xiaowang1.jpg" class="head">
                </div>
            </div>
            <div class="intro">
                <p v-for="(item,index) in selfIntroduction" :key="index">{{item}}</p>
            </div>
        </div>
        <div class="intro-title con">联系我</div>
        <div class="about-bottom con">
            <div class="icon-item" @click="toConcat('git')" title="我的github">
                <span class="iconfont iconhuaban88 git"></span>
            </div>
            <div class="icon-item" @click="toConcat('juejin')" title="我的掘金">
                <span class="iconfont iconjuejin juejin"></span>
            </div>
            <div class="icon-item" @mouseenter="showChat" @mouseleave="showChat">
                <span class="iconfont iconweixin weixin"></span>
            </div>
        </div>
        <transition enter-active-class="animate__animated animate__fadeIn animate__delay-.3s"
                    leave-active-class="animate__animated animate__fadeOut animate__delay-.3s">
            <div class="we-chat" v-if="showWeChat">
                <img :src="selfInfoUrl.wechat">
            </div>
        </transition>
    </div>
</template>

<script>
// import HeaderImg from '@/components/index/HeaderImg.vue';

export default {
    components: {
        // HeaderImg,
    },
    data() {
        return {
            // 微信照片显示隐藏
            showWeChat: false,
            // 自我介绍
            selfIntroduction: [],
            selfInfoUrl: {},
        };
    },
    computed: {},
    watch: {
    },
    created() {
        this.selfIntroduction = CONFIG.selfIntroduction;
        this.selfInfoUrl = CONFIG.selfInfoUrl;
    },
    mounted() {
    },
    destroyed() {},
    methods: {
        /**
        *@description: 展示微信二维码
        *@param{}
        *@return:
        */
        showChat() {
            this.showWeChat = !this.showWeChat;
        },
        /**
        *@description: 链接
        *@param{}
        *@return:
        */
        toConcat(type) {
            if (type === 'git') {
                window.open(this.selfInfoUrl.git);
            } else {
                window.open(this.selfInfoUrl.juejin);
            }
        },
    },
};
</script>
<style lang="scss">
.el-card{
    background: #202429 !important;
    color: #EDFBFF !important;
    border: 1px solid #000 !important;
}
</style>
<style lang='scss' scoped>
.about {
    width: 100%;
    height: 100%;
    padding-top: vh(90);
    background: #202429;
    .intro-title {
        width: 100%;
        height: vh(60);
        line-height: vh(60);
        font-size: vw(30);
        color: #EDFBFF;
        text-align: center;
    }
    .con {
        padding: 0 vw(460);
        box-sizing: border-box;
    }
    .about-top{
        margin-top: vh(30);
        width: 100%;
        height: vh(500);
        line-height: vh(600);
        // background: bisque;
        display: flex;
        justify-content: space-between;
        .self{
            width:50%;
            // background: cadetblue;
            // align-self: center;
            .head {
                width: vw(200);
                height: vw(200);
                border-radius: vw(250);
                // background: chartreuse;
                margin: 0 auto;
            }
        }
        .intro {
            width:50%;
            // background: crimson;
            color: #EDFBFF;
            p{
                height: vh(70);
                line-height: vh(70);
                font-size: vw(20);
                letter-spacing: vw(2);
            }
        }

    }

    .about-bottom {
        margin-top: vh(30);
        width: 100%;
        height: vw(90);
        // background: cyan;
        padding: 0 vw(780);
        display: flex;
        justify-content: space-between;
        .icon-item {
            cursor: pointer;
            width:vw(90);
            border-radius: vw(90);
            text-align: center;
            line-height: vw(90);
            color: #EDFBFF;
            span {
                display: inline-block;
                font-size: vw(50);
            }
            .juejin {
                color: #007fff;
                }
                .weixin {
                    color: rgb(70, 187, 54);
                }
        }
    }
    .we-chat {
        width: vw(400);
        height: vw(400);
        background: whitesmoke;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
