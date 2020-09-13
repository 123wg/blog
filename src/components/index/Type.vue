/**
* @Description: 分类页面
* @Author: wanggang
* @Date: 2020-08-04 20:31:56
**/

<template>
    <div class="type">
        <HeaderImg :url="'https://chefwang.oss-cn-shanghai.aliyuncs.com/images/water-1761027.jpg'"></HeaderImg>
        <Article></Article>
    </div>
</template>

<script>
import HeaderImg from '@/components/index/HeaderImg.vue';
import Article from '@/components/index/Article.vue';

export default {
    components: {
        HeaderImg,
        Article,
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
    mounted() {},
    destroyed() {},
    methods: {

    },
};
</script>
<style lang='scss' scoped>
.type {
    width: 100%;
    height: 100%;
    background: #202429;
}
</style>
