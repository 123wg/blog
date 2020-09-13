/**
* @Description: 归档
* @Author: wanggang
* @Date: 2020-08-04 20:32:54
**/

<template>
    <div class="archive">
        <div class="time-line">
            <el-timeline>
                <el-timeline-item
                    v-for="(item, index) in articleList"
                    placement="top"
                    :key="index"
                    type="info"
                    size="large"
                    :timestamp="item.year">
                    <div class="time-line-level">
                        <el-timeline>
                            <el-timeline-item
                                placement="top"
                                v-for="(items, indexs) in item.list"
                                :key="indexs"
                                type="info"
                                size="large"
                                :timestamp="items.createTime.substr(0,16)">
                                <div @click="toContent(items)">
                                    <el-card>
                                        <span class="title">{{items.title}}</span>
                                    </el-card>
                                </div>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            articleList: [],
            page: {
                pageNum: 1,
            },
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getData();
    },
    destroyed() {},
    methods: {
        /**
    *@description: 获取所有文章
    *@param{}
    *@return:
    */
        getData() {
            const param = {
                pageNum: this.page.pageNum,
                archive: true,
            };
            this.$api.article.list(param, (res) => {
                if (res.success) {
                    if (res.success) {
                        this.articleList = res.data;
                    }
                }
            });
        },
        /**
        *@description: 跳转详情页
        *@param{}
        *@return:
        */
        toContent(item) {
            this.$router.push({
                path: `/content/${item.id}`,
            });
        },
    },
};
</script>
<style lang="scss">
.archive {
    .time-line-level {
        .el-timeline .el-timeline-item .el-timeline-item__tail {
            display: inline-block;
        }
        .el-timeline .el-timeline-item:last-child .el-timeline-item__tail {
            display: none;
        }
    }
    .el-timeline-item__timestamp.is-top {
        height: vh(40);
        line-height: vh(40);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .el-card {
        cursor: pointer;
         background:#202429;
         border: 1px solid black;
         color: #BEC3C9;
         .title {
             font-size: vw(16);
             height: vh(40);
             line-height: vh(40);
         }
    }
}
</style>
<style lang='scss' scoped>
.archive {
    width:100%;
    // height: auto;
    background: #202429;
    .time-line {
        position: relative;
        width: 50%;
        top: vh(80);
        // height: 2000px;
        transform: translateX(50%);
        color: white;

    }
}
</style>
