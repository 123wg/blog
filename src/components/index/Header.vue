/**
* @Description: 公共头部
* @Author: wanggang
* @Date: 2020-08-04 20:56:00
**/

<template>
    <div class="index-header">
        <div class="header-item">
            <div class="left">
                <div class="left-item">
                    <div class="left-icon" @click="cleanType">
                        <router-link to="/"></router-link>
                    </div>
                </div>
                <div class="left-item" @click="cleanType">
                    <router-link to="/" tag="li">主页</router-link>
                </div>
                <el-dropdown trigger="click" class="left-item" @command="handleCommand">
                    <span class="el-dropdown-link">分类
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item" v-for="item in articleType" :key="item.id">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="left-item">
                    <router-link to="/archive" tag="li">归档</router-link>
                </div>
                <div class="left-item">
                    <router-link to="/about" tag="li">关于</router-link>
                </div>
            </div>
            <div class="right">
                <div class="right-item" @click="searchArticle">
                    <span class="iconfont iconicon-search"></span>
                </div>
            </div>
        </div>
        <transition enter-active-class="animate__animated animate__fadeIn animate__delay-.3s"
                    leave-active-class="animate__animated animate__fadeOut animate__delay-.3s">
            <SearchPage v-if="showSearch"></SearchPage>
        </transition>
    </div>
</template>

<script>
import SearchPage from '@/components/index/SearchPage.vue';

export default {
    components: {
        SearchPage,
    },
    data() {
        return {
            articleType: [],
        };
    },
    computed: {
        showSearch() {
            return this.$store.getters.showSearch;
        },
    },
    watch: {
    },
    created() {
        this.getType();
    },
    mounted() {},
    destroyed() {},
    methods: {
        /**
        *@description: 获取所有类型
        *@param{}
        *@return:
        */
        getType() {
            this.$api.type.list({}, (res) => {
                if (res.success) {
                    this.articleType = res.data;
                }
            });
        },
        /**
        *@description: 选择分类
        *@param{}
        *@return:
        */
        handleCommand(item) {
            this.$store.commit('article/setTypeId', item.id);
            this.$router.push('/type');
        },
        cleanType() {
            this.$store.commit('article/setTypeId', '');
        },

        /**
        *@description: 文章全文检索
        *@param{}
        *@return:
        */
        searchArticle() {
            console.log('全局搜索');
            this.$store.commit('article/setShowSearch', true);
        },

    },
};
</script>
<style lang="scss">
// .index-header {
.el-dropdown {
    font-size: vw(16);
    color: #808080 !important;
}
.el-dropdown-menu {
    background-color: #202429 !important;
    background: #202429 !important;
    border: none !important;
    top: vh(50) !important;
    width: vw(130);
    text-align: center;
}
.el-dropdown-menu__item {
background: #202429 !important;
    &:hover {
        background: #283B4E !important;
    }
}
.el-popper[x-placement^=bottom] .popper__arrow {
   display: none !important;
}
// }

</style>
<style lang='scss' scoped>
.index-header{
    z-index: 9999;
    position: absolute;
    width: 100%;
    height:vh(70);
    line-height: vh(70);
    background: #202429;
    box-sizing: border-box;
    padding:0 vw(200);
    .header-item {
        width: 100%;
        display: flex;
        text-align: center;
        justify-content: space-between;
        color: #808080;
        .left {
            display: flex;
            justify-content: space-between;
             .left-item{
                width: vw(100);
                font-size: vw(16);
                cursor: pointer;
                li {
                    list-style: none;
                }
                .left-icon {
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 50%;
                    width: vw(30);
                    height: vh(30);
                    background: url('http://pngimg.com/uploads/butterfly/butterfly_PNG1016.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }
        .right{
            width: vw(400);
            display: flex;
            .right-item {
                z-index: 10;
                width: vw(100);
                cursor: pointer;
            }
        }
    }
}
</style>
