/* eslint-disable*/

/**
* @Description: 用户登录全局变量
* @Author: wanggang
* @Date: 2020-05-15 10:59:05
* */
// api接口
// token 工具类
import { getToken, setToken } from '@/common/util/auth';
// 接口
import api from '@/common/http/api';
// router信息
// import router,{ constantRoutes,resetRouter ,syncRoutes} from '@/router/index';

const state = {
    // token 认证信息
    token: getToken(),
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
};

const actions = {
    // TODO用户登录 获取token
    userLogin({ commit }, userInfo) {
        return new Promise((resolve) => {
            // 执行登录方法
            api.user.login(userInfo,(res) => {
                const { data } = res;
                // store保存token
                commit('SET_TOKEN', data.token);
                // token入缓存
                setToken(data.token);
                resolve();
            })
        });
    },

    // TODO获取用户信息 保存角色和用户名
    // getUserInfo({ commit, state }) {
    //     return new Promise((resolve) => {
    //         api.user.userInfo(state.token,res => {
    //             const { data } = res;
    //             const { roles, name } = data;
    //             // TODO 判断roles 不能为空
    //             // TODO 判断 name 必须存在
    //             // 保存用户名 保存权限信息
    //             commit('SET_NAME', name);
    //             commit('SET_ROLES', roles);
    //             resolve(roles);
    //         })
    //     });
    // },

    /**
    *@description: 用户退出 清除token和角色信息 重置路由
    */
    // logout({ commit }) {
    //     return new Promise((resolve, reject) => {
    //         // 请求接口用户退出
    //         api.user.logout(state.token).then(() => {
    //             // 清除store保存的用户信息
    //             commit('SET_TOKEN', '');
    //             // 清除缓存
    //             commit('SET_ROLES', []);
    //             // 清除緩存
    //             delToken();
    //             // 重置路由信息
    //             resetRouter();
    //         }).catch((err) => {
    //             reject(err);
    //         });
    //     });
    // },

    // TODO token重置
    // resetToken({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         console.log('清除');
    //         commit('SET_TOKEN', '');
    //         commit('SET_ROLES', []);
    //         delToken();
    //         resetRouter();
    //     });
    // },

    // TODO 动态修改用户角色信息 请求接口修改权限信息
    // changeRoles({commit,dispatch},roles) {
    //     return new Promise(resolve=> {

    //     })
    // }
};

export default {
    // 解决store 分模块管理命名冲突的问题 使用时需要在方法前加模块名称信息
    namespaced: true,
    state,
    mutations,
    actions,
};
