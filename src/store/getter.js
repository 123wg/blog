/**
* @Description: 保存所有的getters
* @Author: wanggang
* @Date: 2020-05-20 15:07:41
* */
const getters = {
    typeId: (state) => state.article.typeid,
    showSearch: (state) => state.article.showSearch,
    token: (state) => state.user.token,
    routes: (state) => state.permission.routes,
};

export default getters;
