/* eslint-disable */

/**
* @Description: 路由导航 异步路由加载全局变量
* @Author: wanggang
* @Date: 2020-05-18 13:45:31
* */
import { resetRouter,syncRoutes, constantRoutes } from '@/router/index';
import api from '@/common/http/api';
import { getToken } from '@/common/util/auth';
const state = {
    // 当前加载的所有路由
    routes: [],
    // 动态添加的路由
    addRoutes: [],
};

const mutations = {
    SET_ROUTES(state, routes) {
        state.addRoutes = routes;
        // 路由拼接
        state.routes = constantRoutes.concat(routes);
    },
};

const actions = {
    // TODO异步加载路由的方法
    generateRoutes({ state, commit }) {
        return new Promise((resolve) => {
            const addRoutes = syncRoutes;
            commit('SET_ROUTES',addRoutes);
            // 根据角色筛选出异步路由中需要添加的路由
            resolve(addRoutes);
        });
    },
    // 判断token是否有效
    tokenRefresh() {
        return new Promise((resolve,reject)=>{
            const param = {
                token:getToken()
            }
            api.token.check(param,(res) => {
                if(res.success) {
                    resolve();
                }else {
                    reject();
                }
            })
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
