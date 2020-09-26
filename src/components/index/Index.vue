/**
* @Description: 主页
* @Author: wanggang
* @Date: 2020-08-04 20:30:18
**/
<template>
    <div class="index">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x: hidden;">
            <Header></Header>
            <!-- <transition mode="out-in" appear
                        enter-active-class="animate__animated animate__fadeInUp"
                        leave-active-class="animate__animated animate__fadeOutDown"
                        :duration="400"
            > -->
            <router-view :key="$route.fullPath"></router-view>
            <!-- </transition> -->
            <template>
                <el-backtop target=".index .el-scrollbar__wrap" title="回到顶部"></el-backtop>
            </template>
        </el-scrollbar>
        <Player></Player>
    </div>
</template>

<script>
import Header from '@/components/index/Header.vue';
import Player from 'zw-player';

export default {
    components: {
        Header,
        Player,
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {
    },
    created() {

    },
    mounted() {
    },
    destroyed() {},
    methods: {

    },
};
</script>
<style lang="scss">
.index {
    // 音乐播放器样式
    .bbox {
        left: vw(20);
        top: 60%;
        width: vw(214);
        height: vh(275);
    }
    .music_words{
        width: 98%;
        height: vh(150);
    }
    .control_box{
        bottom: vh(60);
        height: vh(60);
    }
    .progress {
        width: 56%;
    }
    .music_dis{
        height: vh(285);
    }
    .music_title{
        font-size: vw(12);
        // text-align: right;
    }
    .list_box{
        top: 0;
        z-index: 10000;
    }
    .dis_list{
        top: vh(1);
    }
    .el-backtop{
        background: none;
        border: 1px solid #fff;
        color: white;
        &:hover {
            background: none !important;
        }
    }
}

</style>
<style lang='scss' scoped>
.index {
    width: 100%;
    height: 100%;
    background: #202429;
    overflow: auto;
}
</style>
