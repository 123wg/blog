/**
* @Description: 文章管理
* @Author: wanggang
* @Date: 2020-08-06 20:47:14
**/
<template>
    <div class="article-man">
        <el-table
            :data="articles"
            border
            height="500"
            style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                align="center">
            </el-table-column>
            <el-table-column
                prop="typeId.name"
                label="分类"
                align="center">
            </el-table-column>
            <el-table-column
                label="摘要"
                prop="abstract"
                align="center">
                <!-- <template slot-scope="scope">
                    <div class="article-cover">
                        <img :src="scope.row.coverId.path">
                    </div>
                </template> -->
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="发布时间"
                align="center">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="articleEdit(scope.row.id)"
                               title="修改"
                    ></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="articleDelete(scope.row)"
                               title="删除"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                @current-change="handleChange"
                :current-page.sync="page.pageNum"
                :page-size="page.pageSize"
                prev-text="上一页"
                next-text="下一页"
                layout="total, prev, pager, next"
                :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            articles: [], // 所有文章列表
            page: {
                pages: 1,
                pageNum: 1,
                pageSize: 7,
                total: 0,
            },
        };
    },
    computed: {},
    watch: {},
    created() {
        // 获取所有文章
        this.articleList();
    },
    mounted() {},
    destroyed() {},
    methods: {
        /**
        *@description: 查询所有文章
        *@param{}
        *@return:
        */
        articleList() {
            const param = {
                pageNum: this.page.pageNum,
                pageSize: this.page.pageSize,
            };
            this.$api.article.list(param, (res) => {
                if (res.success) {
                    this.articles = res.data.docs;
                    console.log(res.data);
                    this.page.total = res.data.total;
                    this.page.pages = res.data.pages;
                    // this.page.
                }
            });
        },
        /**
        *@description: 修改文章
        *@param{}
        *@return:
        */
        articleEdit(articleId) {
            this.$router.push({
                path: '/admin/article/add',
                query: {
                    id: articleId,
                },
            });
        },
        /**
       *@description: 删除文章
       *@param{}
       *@return:
       */
        articleDelete(article) {
            this.$confirm('此操作将永久删除该篇文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // FIXME 删除文章同时删除文件
                const param = {
                    id: article.id,
                };
                this.$api.article.delete(param, (res) => {
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',
                        });
                        this.articleList();
                    }
                });
            });
        },
        handleChange(pageNum) {
            this.page.pageNum = pageNum;
            this.articleList();
        },
    },
};
</script>
<style lang='scss'>
.article-man {
    .el-table  {
        height:vh(952) !important;
    }
    .el-table .cell {
        display: flex;
        justify-content: center;
    }
    .article-cover {
        width: vw(200);
        height: vw(90);
        img {
            width: 100%;
            height:100%
        }
    }
    .page{
        width: 100%;
        margin-top: vh(15);
        text-align: right;
    }
}

</style>
