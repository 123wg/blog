/**
* @Description: 后台管理页面首页
* @Author: wanggang
* @Date: 2020-08-05 20:30:20
**/
<template>
    <div class="admin">
        <el-container>
            <el-aside>
                <el-menu
                    :default-active="$route.path"
                    :collapse="iscollapse"
                    class="el-menu-vertical-demo"
                    :router = "true"
                    background-color="#042236"
                    text-color="#ffffff"
                    :unique-opened="false"
                    active-text-color="#ffffff"
                    mode="vertical"
                >
                    <div class="menu-toggle" @click="control">
                        <i class="el-icon-s-fold" v-show="!iscollapse" title="收起"></i>
                        <i class="el-icon-s-unfold" v-show="iscollapse" title="展开"></i>
                    </div>
                    <NavList :routes="routes"></NavList>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import NavList from '@/components/admin/NavList.vue';

export default {
    name: 'Admin',
    components: {
        NavList,
    },
    data() {
        return {
            iscollapse: false,
        };
    },
    computed: {
        routes() {
            // console.log(this.$store.getters.routes);
            return this.$store.getters.routes.filter((item) => item.meta.show)[0].children;
        },
    },
    watch: {},
    created() {
    },
    mounted() {},
    destroyed() {},
    methods: {
        control() {
            this.iscollapse = !this.iscollapse;
        },
    },
};
</script>
<style lang="scss">
.admin {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: vw(250);
        // min-height: vh(400);
    }
    .el-aside {
        width:auto !important;
        // overflow: hidden;
    }
    .el-menu-item.is-active {
        background: #FFB840 !important;
    }
}
</style>
<style lang='scss' scoped>
.admin {
    width: 100%;
    height: 100%;
    .el-container {
        width: 100%;
        height: 100%;
        .el-menu {
            height: 100%;
        }
    }
    .menu-toggle {
        height: vh(30);
        color: white;
        background: #4a5064;
        font-size: vw(18);
        line-height: vh(30);
        text-align: center;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
