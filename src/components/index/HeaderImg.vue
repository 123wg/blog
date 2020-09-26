/**
* @Description: 头部图片
* @Author: wanggang
* @Date: 2020-08-04 23:44:34
**/
<template>
    <div class="header-img">
        <span class="header-title">
            {{title || this.defaultSign}}
        </span>
        <img :src="url">
    </div>
</template>

<script>
export default {
    props: ['url', 'title'],
    components: {},
    data() {
        return {
            defaultSign: '',
        };
    },
    computed: {},
    watch: {},
    created() {
        this.defaultSign = CONFIG.defaultSign;
    },
    mounted() {},
    destroyed() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
.header-img {
    position: relative;
    width: 100%;
    min-height: vh(700);
    .header-title {
        text-indent:2em;
        position: absolute;
        display: inline-block;
        font-size: vw(30);
        line-height: vh(60);
        font-weight: 600;
        z-index: 20;
        color: white;
        top:40%;
        left: 50%;
        transform:translateX(-50%)
    }
img {
    width: 100%;
    height: 100%;
    filter: brightness(70%);
}
}
</style>
