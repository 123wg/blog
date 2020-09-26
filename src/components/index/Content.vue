/**
* @Description: 内容页
* @Author: wanggang
* @Date: 2020-08-04 20:30:29
**/

<template>
    <div class="content">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x: hidden;">
            <Header></Header>
            <HeaderImg  :url="article.coverId?article.coverId.path:'https://chefwang.oss-cn-shanghai.aliyuncs.com/images/water-1761027.jpg'"
                        :title="article.title"
            ></HeaderImg>
            <div class="article">
                <!-- monokai -->
                <!-- solarized-dark -->
                <!-- androidstudio -->
                <mavon-editor
                    :codeStyle="codeStyle"
                    v-html="article.htmlContent"
                    class="mark-self"
                    :navigation="true"
                ></mavon-editor>
            </div>
            <template>
                <el-backtop target=".content .el-scrollbar__wrap" title="回到顶部"></el-backtop>
            </template>
        </el-scrollbar>
    </div>
</template>

<script>
import Header from '@/components/index/Header.vue';
import HeaderImg from '@/components/index/HeaderImg.vue';

export default {
    components: {
        Header,
        HeaderImg,
    },
    data() {
        return {
            article: '',
            codeStyle: '',
        };
    },
    computed: {
        articleId() {
            return this.$route.params.id;
        },
    },
    watch: {
        articleId() {
            this.getContent(this.articleId);
        },
    },
    created() {
        this.codeStyle = CONFIG.codeStyle;
        this.getContent(this.$route.params.id);
    },
    mounted() {},
    destroyed() {},
    methods: {
        /**
        *@description: 获取文章详情
        *@param{}
        *@return:
        */
        getContent(articleId) {
            const param = {
                id: articleId,
            };
            this.$api.article.getById(param, (res) => {
                if (res.success) {
                    this.article = res.data;
                }
            });
        },
    },
};
</script>
<style lang="scss">
@import url('../../plugins/markdown.scss');
.content {
    @for $i from 1 through 5 {
    .markdown-body h#{$i} {
        border-bottom: none !important;
    }

}
.el-backtop{
    background: none;
    border: 1px solid #fff;
    color: white;
    &:hover {
        background: none !important;
    }
}
li{
        list-style: initial;
    }
}
</style>
<style lang='scss' scoped>
.content{
    width: 100%;
    height: 100%;
    background: #202429;
    .article {
        padding: vh(20) vw(250);
        margin-bottom: vh(50);
    }
}
</style>
