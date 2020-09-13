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
    </div>
</template>

<script>
import Header from '@/components/index/Header.vue';

export default {
    components: {
        Header,

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
