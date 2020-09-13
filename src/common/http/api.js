/**
*@author: wanggang
*@date: 2020-04-27 14:31:18
*@description: api接口请求文件
*/
import {
    get,
    post,
    // postJson,
    postForm,
} from './http';

const api = {
    // 测试模块
    article: {
        // 发布文章
        add(param, callback) {
            post('/article/add', param).then((res) => {
                callback(res);
            });
        },
        // 所有文章
        list(param, callback) {
            get('/article/list', param).then((res) => {
                callback(res);
            });
        },
        // 根据id查找文章
        getById(param, callback) {
            get('/article/getById', param).then((res) => {
                callback(res);
            });
        },
        // 修改文章
        update(param, callback) {
            post('/article/update', param).then((res) => {
                callback(res);
            });
        },
        // 删除文章
        delete(param, callback) {
            post('/article/del', param).then((res) => {
                callback(res);
            });
        },
        // 关键字查询
        searchByKey(param, callback) {
            get('/article/searchByKey', param).then((res) => {
                callback(res);
            });
        },
    },
    // 文章类型
    type: {
        // 新增文章类型
        add(param, callback) {
            post('/type/add', param).then((res) => {
                callback(res);
            });
        },
        // 修改文章类型
        update(param, callback) {
            post('/type/update', param).then((res) => {
                callback(res);
            });
        },
        // 删除文章类型
        delete(typeId, callback) {
            post(`/type/del?id=${typeId}`).then((res) => {
                callback(res);
            });
        },
        // 查询文章列表
        list(param, callback) {
            get('/type/list', param).then((res) => {
                callback(res);
            });
        },

    },
    // 文件模块
    file: {
        // 上传文件
        upload(param, callback) {
            postForm('/file/upload', param).then((res) => {
                callback(res);
            });
        },
        // 删除文件
        del(param, callback) {
            post('/file/del', param).then((res) => {
                callback(res);
            });
        },
    },
    // 用户模块
    user: {
        login(param, callback) {
            post('/user/login', param).then((res) => {
                callback(res);
            });
        },
    },
    // token验证
    token: {
        check(param, callback) {
            get('/token/check', param).then((res) => {
                callback(res);
            });
        },
    },
};
export default api;
