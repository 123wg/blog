/**
* @Description: 主页
* @Author: wanggang
* @Date: 2020-08-15 20:37:30
**/

<template>
    <div class="home">
        <HeaderImg url="https://chefwang.oss-cn-shanghai.aliyuncs.com/images/water-1761027.jpg"></HeaderImg>
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
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {},
};
</script>
<style lang='scss'>
</style>
