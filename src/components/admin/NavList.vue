<template>
    <fragment>
        <template v-for="(item,index) in routes">
            <el-submenu v-if="item.children" :index="item.path" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.name}}</span>
                </template>
                <NavList :routes="item.children"></NavList>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="index">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </template>
    </fragment>
</template>

<script>
export default {
    name: 'NavList',
    props: ['routes'],
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {},
    destroyed() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
