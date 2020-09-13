/**
* @Description: 文章类型管理
* @Author: wanggang
* @Date: 2020-08-09 15:40:56
**/

<template>
    <div class="type-man">
        <!-- FIXME 搜索条件 暂时不加 -->
        <!-- <div class="search"></div> -->
        <!-- 列表区域 -->
        <div class="content">
            <el-table
                border
                :data="typeList"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="名称"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="sort"
                    label="排序"
                    align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- FIXME 分页 暂时不加 -->
        <div class="page">
            <div class="add">
                <el-button type="primary" @click="addType">添加类型</el-button>
            </div>
        </div>
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            v-if="dialog.show"
            width="30%"
            :close-on-click-modal="false">
            <el-form  :model="dialog.data" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类型名称" prop="name">
                    <el-row>
                        <el-col :span="24">
                            <el-input v-model="dialog.data.name"></el-input>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-row>
                        <el-col :span="24">
                            <el-input  v-model.number="dialog.data.sort"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="confirm">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            entity: {
                name: '',
                sort: null,
                createTime: '',
                updateTime: '',
            },
            typeList: [], // 所有文章类型
            dialog: {
                show: false,
                title: '添加文章类型',
                data: {},
            },
            // 表单校验
            rules: {
                name: {
                    required: true, type: 'string', message: '名称为必填项', trigger: 'change',
                },
                sort: {
                    required: true, type: 'number', message: '排列顺序为必填项', trigger: 'change',
                },
            },
        };
    },
    computed: {},
    watch: {},
    created() {
        this.getData();
    },
    mounted() {},
    destroyed() {},
    methods: {
        /**
        *@description: 获取所有类型数据
        *@param{}
        *@return:
        */
        getData() {
            const param = {};
            this.$api.type.list(param, (res) => {
                if (res.success) {
                    this.typeList = res.data;
                }
            });
        },
        /**
        *@description: 删除文章
        *@param{}
        *@return:
        */
        handleDel(type) {
            this.$confirm('删除该类型及该类型的所有文章?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$api.type.delete(type.id, (res) => {
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',
                        });
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败',
                        });
                    }
                });
            });
        },

        /**
        *@description: 添加文章类型
        *@param{}
        *@return:
        */
        addType() {
            this.dialog.show = true;
            this.dialog.title = '添加文章类型';
            this.dialog.data = { ...this.entity };
        },

        /**
        *@description: 关闭弹窗
        *@param{}
        *@return:
        */
        close() {
            this.dialog.show = false;
            this.dialog.data = {};
        },

        /**
        *@description: 确认提交
        *@param{}
        *@return:
        */
        confirm() {
            this.$refs.addForm.validate((valited) => {
                if (valited) {
                    this.$api.type.add(this.dialog.data, (res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '新增成功',
                            });
                            this.getData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '新增失败',
                            });
                        }
                        this.close();
                    });
                }
            });
        //  字段校验
        // 保存数据
        // 刷新数据
        // 关闭弹窗
        },
    },
};
</script>
<style lang="scss">
// .type-man {
//     .el-input-number {
//         width: 100% !important;
//         .el-input__inner {
//             text-align: left !important;
//         }
//     }
// }
</style>
<style lang='scss' scoped>
.type-man {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .content {
        margin-top: vh(30);
    }
    .page {
        margin-top: vh(15);
        width: 100%;
        height: vh(50);
        line-height: vh(50);
    }
}
</style>
