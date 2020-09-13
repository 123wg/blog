/**
* @Description: 搜索页面
* @Author: wanggang
* @Date: 2020-08-16 18:05:13
**/

<template>
    <div class="search" @click.self="closeSearch">
        <div class="btn" v-show="showSearch">
            <el-autocomplete placeholder="请输入内容" v-model="search" class="input-with-select"
                             :trigger-on-focus="false"
                             :fetch-suggestions="searchArticle"
                             ref="searchBtn"
            >
                <el-button slot="prepend" icon="el-icon-search"></el-button>
            </el-autocomplete>
            <div class="search-result">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x: hidden;">
                    <div class="result-item" v-for="(item,index) in articleList"
                         :key="index"
                         @click="selectArticle(item)">
                        {{item.title}}
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            search: '',
            articleList: [],
        };
    },
    computed: {
        showSearch() {
            return this.$store.getters.showSearch;
        },
    },
    watch: {
        search() {
            if (this.search === '') {
                this.articleList = [];
            }
        },
    },
    created() {},
    mounted() {
        this.$refs.searchBtn.$refs.input.focus();
    },
    destroyed() {},
    methods: {
        /**
        *@description: 搜索文章
        *@param{}
        *@return:
        */
        searchArticle(words) {
            const param = {
                keywords: words,
            };
            this.$api.article.searchByKey(param, (res) => {
                this.articleList = res.data;
            });
        },
        /**
        *@description: 点击搜索的结果
        *@param{}
        *@return:
        */
        selectArticle(item) {
            this.$store.commit('article/setShowSearch', false);
            this.$router.push({
                path: `/content/${item.id}`,
            });
        },
        closeSearch() {
            this.$store.commit('article/setShowSearch', false);
        },
    },
};
</script>
<style lang="scss">
.search {
    .el-input-group--prepend .el-input__inner{
        color: #bfbdba;
        background: #211e1c;
        border: none !important;
    }
    .el-input-group__prepend{
         color: #bfbdba;
         background: #211e1c;
         border: none !important;
    }
    .el-scrollbar__wrap{
        margin-bottom: 0 !important;
    }
}
.el-autocomplete-suggestion{
    display: none;
    // position: absolute !important;
    // background: #211e1c !important;
    // border: none !important;
    // width: vw(500) !important;
    // margin-top: vh(0) !important;
    // left: 50% !important;
    // transform: translateX(-50%);
    // transition: none !important;
    // .el-scrollbar__wrap{
    //     background: #211e1c !important;
    // }
}
// .el-autocomplete-suggestion li{
//     cursor: pointer !important;
//     color: #fff !important;
//     border-top: 1px solid #c0c0c0;
//     .article {
//         height: vh(50);
//         line-height: vh(50);
//     }
// }
</style>
<style lang='scss' scoped>
.search{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
   background-color: rgba(33, 42, 55,0.5);
    .btn{
        width: vw(500);
        position: relative;
        top: 12%;
        // height: vh(60);
        // line-height: vh(60);
        left: 50%;
        transform: translateX(-50%);
        background: #211e1c;
        border-radius: vw(5);
        .search-result{
            width: 100%;
            height: auto;
            max-height: vh(500);
            .result-item {
                cursor: pointer;
                padding: 0 vw(10);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                height: vh(60);
                line-height: vh(60);
                color: #bfbdba;
                border-top: 1px solid #808080;
            }
        }
    }
}
</style>
