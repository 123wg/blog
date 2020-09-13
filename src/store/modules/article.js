/* eslint-disable*/
/**
* @Description: 其他模块
* @Author: wanggang
* @Date: 2020-05-15 15:24:40
* */
const state = {
    typeid:'',
    showSearch:false, //是否展示搜索框
};

const mutations = {
    setTypeId(state,typeid){
        state.typeid = typeid;
    },
    setShowSearch(state,showSearch) {
        state.showSearch = showSearch;
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
