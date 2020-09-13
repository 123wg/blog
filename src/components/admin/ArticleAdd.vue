/**
* @Description: 新增文章组件
* @Author: wanggang
* @Date: 2020-08-05 20:48:11
**/

<template>
    <div class="article-add">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x: hidden;">
            <el-form :model="article" :rules="rules" ref="addForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="article.title" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="文章类型" prop="typeId">
                    <el-select v-model="article.typeId" placeholder="请选择">
                        <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章摘要" prop="abstract">
                    <el-row>
                        <el-col :span="12">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入摘要"
                                v-model="article.abstract">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <!-- 封面图片 -->
                <el-form-item label="文章封面" prop="files">
                    <el-upload
                        action=""
                        :auto-upload="false"
                        list-type="picture-card"
                        :on-change="fileUpload"
                        :file-list="fileList"
                        accept=".png,.jpg,.jpeg,.gif"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item  prop="content">
                    <mavon-editor  v-model="article.mdContent"
                                   codeStyle="solarized-dark"
                                   fontSize="18px"
                                   :toolbarsBackground="'#f9f9f9'"
                                   @imgAdd="handleEditorImgAdd"
                                   @imgDel="handleEditorImgDel"
                                   :toolbars="toolbars" ref="md"/>
                </el-form-item>
            </el-form>
            <div class="save">
                <el-button v-if="$route.query.id" type="primary" @click="articleEdit">更新文章</el-button>
                <el-button v-else type="primary" @click="publish">发布文章</el-button>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            fileList: [],
            test: '',
            article: {
                title: '',
                typeId: '',
                mdContent: '',
                htmlContent: '',
                coverId: '',
                abstract: '',
            },
            typeList: [],
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                // trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            rules: {
                title: { required: true, message: '请填写标题' },
                typeId: { required: true, message: '请选择文章类型' },
                abstract: { required: true, message: '请填写文章摘要' },
            },
        };
    },
    computed: {},
    watch: {},
    created() {
        if (this.$route.query.id) {
            // 修改文章
            this.initArticle(this.$route.query.id);
        }
        this.initParam();
    },
    mounted() {
    },
    destroyed() {},
    methods: {
        /**
        *@description: 初始化获取文章数据
        *@param{}
        *@return:
        */
        initArticle(id) {
            const param = {
                id,
            };
            this.$api.article.getById(param, (res) => {
                if (res.success) {
                    const cover = res.data.coverId;
                    const obj = {
                        url: cover.path,
                        // eslint-disable-next-line no-underscore-dangle
                        id: cover._id,
                    };
                    this.fileList.push(obj);
                    this.article = res.data;
                    // eslint-disable-next-line no-underscore-dangle
                    this.article.coverId = cover._id;
                    this.article.typeId = res.data.typeId.id;
                }
            });
        },
        /**
        *@description: 获取所有文章类型
        *@param{}
        *@return:
        */
        initParam() {
            const param = {};
            this.$api.type.list(param, (res) => {
                if (res.success) {
                    this.typeList = res.data;
                }
            });
        },
        /**
        *@description: 文本中添加图片方法
        *@param{}
        *@return:
        */
        handleEditorImgAdd(pos, file) {
            const form = new FormData();
            form.append('file', file);
            this.$api.file.upload(form, (res) => {
                console.log(res.data.path);
                if (res.success) {
                    this.$refs.md.$img2Url(pos, res.data.path);
                }
            });
        },
        /**
        *@description: 删除图片
        *@param{}
        *@return:
        */
        handleEditorImgDel(filename) {
            // FIXME 根据文件路径删除
            const fileName = filename[0];
            const param = {
                name: fileName,
            };
            this.$api.file.del(param, (res) => {
                if (res.success) {
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                }
            });
        },
        /**
        *@description: 发布文章
        *@param{}
        *@return:
        */
        publish() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if (this.article.coverId.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '请上传文章封面',
                        });
                        return;
                    }
                    if (this.article.mdContent.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '文章内容不能为空',
                        });
                        return;
                    }
                    this.article.htmlContent = this.$refs.md.d_render;
                    this.$api.article.add(this.article, (res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '文章发布成功',
                            });
                            this.$router.push('/admin/article/manager');
                            // 清空内容
                            // 跳转文章列表页面
                        } else {
                            this.$message({
                                type: 'error',
                                message: '发布失败,请检查',
                            });
                        }
                    });
                }
            });
        },
        /**
        *@description: 文件上传
        *@param{}
        *@return:
        */
        // TODO
        fileUpload(file) {
            if (file.status === 'ready') {
                const form = new FormData();
                form.append('file', file.raw);
                this.$api.file.upload(form, (res) => {
                    console.log(res);
                    if (res.success) {
                        this.article.coverId = res.data.id;
                        const obj = {
                            url: res.data.path,
                            // eslint-disable-next-line no-underscore-dangle
                            id: res.data.id,
                        };
                        this.fileList.splice(0, 1, obj);
                    } else {
                        this.$message({
                            type: 'error',
                            msg: '上传失败',
                        });
                    }
                });
            }
        },
        /**
        *@description: 删除图片
        *@param{}
        *@return:
        */
        // TODO
        handleRemove() {
            console.log(this.fileList);
            const param = {
                id: this.fileList[0].id,
            };
            this.$api.file.del(param, (res) => {
                if (res.success) {
                    this.article.coverId = '';
                    this.fileList = [];
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                }
            });
        },
        /**
        *@description: 更新文章
        *@param{}
        *@return:
        */
        //    TODO
        articleEdit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if (this.article.coverId.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '请上传文章封面',
                        });
                        return;
                    }
                    if (this.article.mdContent.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '文章内容不能为空',
                        });
                        return;
                    }
                    this.article.htmlContent = this.$refs.md.d_render;
                    this.$api.article.update(this.article, (res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '更新成功',
                            });
                            // 清空内容
                            this.$router.push('/admin/article/manager');
                            // 跳转文章列表页面
                        } else {
                            this.$message({
                                type: 'error',
                                message: '更新失败,请检查',
                            });
                        }
                    });
                }
            });
        },

    },
};
</script>
<style lang="scss">
.article-add {
    .el-form-item {
        margin-top: vh(25) !important;
         .el-form-item__content{
            margin-left: 0 !important;
        }
    }
    .el-input {
        width: vw(300) !important;
    }
    .el-select{
        width: vw(300) !important;
    }
    .v-note-wrapper {
        position: relative;
        left: 0 !important;
        min-height: vh(600);
        width:99%;
    }
    li{
        list-style: initial;
    }
}
</style>
<style lang='scss' scoped>
.article-add {
    width: 100%;
    height: 100%;
    .save {
        width: 100%;
        text-align: right;
    }
}
</style>
