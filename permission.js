/* eslint-disable*/
/**
* @Description: 全局导航守卫
* @Author: wanggang
* @Date: 2020-05-15 16:15:20
* */
import router, {resetRouter,syncRoutes} from '@/router/index';
import { getToken } from '@/common/util/auth';
import store from '@/store/index';

// const whiteRoutes = ['/login'];

/**
*@description: 计算是否需要登录
*@param{}
*@return:
*/
function needCheck(router,path) {
    for(let i = 0;i<router.length;i+=1){
        const tmpRoute = router[i];
        if(tmpRoute.path===path) {
            return true;
        }else if(tmpRoute.children){
             return needCheck(tmpRoute.children,path);
        }
    }
}

router.beforeEach(async (to, from, next) => {
    if (from.path === '/admin/article/add' && from.query.id && to.path === '/admin/article/add') {
        window.vm.$message({
            type: 'error',
            message: '修改中不能新增',
        });
    }
    const check = needCheck(syncRoutes,to.path);
    if(check) {
        // 查看有无token
        const token = getToken();
        if(token) {
            if(store.getters.routes.length===0){
                const addRoutes = await store.dispatch('permission/generateRoutes');
                // 重置路由
                resetRouter();
                router.addRoutes([...addRoutes]);
                next({...to},{replace: true});
                 // 有token 的 放行
                if(to.path==='/login') {
                    next('/admin');
                }else {
                    next();
                }
            }else {
                // 请求接口判断token是否有效
                // 无效跳转登录界面
                // 有效放行
                try{
                    await store.dispatch('permission/tokenRefresh');
                    next();
                }catch(err) {
                    next('/login',{replace:true});
                }


            }
        }else {
            next('/login');
            // 没有token 的跳转登录页面
        }
    }else{
        next();
    }
});
