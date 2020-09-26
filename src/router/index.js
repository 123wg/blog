import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 将路由分为同步初始路由和异步路由
export const constantRoutes = [
    {
        path: '',
        component: () => import(/* webpackChunkName: "common" */ '@/components/index/Index.vue'),
        name: '前台',
        meta: {
            show: false,
        },
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import(/* webpackChunkName: "index" */'@/components/index/Home.vue'),
                name: '主页',
            },
            {
                path: 'type',
                component: () => import(/* webpackChunkName: "index" */'@/components/index/Type.vue'),
                name: '分类',
            },
            {
                path: 'archive',
                component: () => import(/* webpackChunkName: "index" */'@/components/index/Archive.vue'),
                name: '归档',
            },
            {
                path: 'about',
                component: () => import(/* webpackChunkName: "index" */'@/components/index/About.vue'),
                name: '关于我',
            },
            {
                path: 'content/:id',
                component: () => import(/* webpackChunkName: "index" */'@/components/index/Content.vue'),
                name: '内容',
                // meta: {
                //     show: false,
                // },
            },
        ],
    },

    {
        path: '/login',
        component: () => import(/* webpackChunkName: "common" */'@/components/admin/Login.vue'),
        name: '登录',
        meta: {
            show: false,
        },
    },
];

// 异步路由-->用户登录后动态根据用户权限信息过滤后加入
export const syncRoutes = [
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "common" */'@/components/admin/Layout.vue'),
        name: '后台管理',
        redirect: '/admin/article',
        meta: {
            show: true,
        },
        children: [
            {
                path: '/admin/article',
                component: () => import(/* webpackChunkName: "admin" */'@/components/admin/Admin.vue'),
                name: '文章管理',
                redirect: '/admin/article/add',
                children: [
                    {
                        path: '/admin/article/manager',
                        component: () => import(/* webpackChunkName: "admin" */'@/components/admin/ArticleManage.vue'),
                        name: '文章列表',
                    },
                    {
                        path: '/admin/article/add',
                        component: () => import(/* webpackChunkName: "admin" */'@/components/admin/ArticleAdd.vue'),
                        name: '编辑文章',
                    },
                ],
            },
            {
                path: '/admin/type',
                component: () => import(/* webpackChunkName: "admin" */'@/components/admin/Admin.vue'),
                name: '类型管理',
                redirect: '/admin/type/manager',
                children: [
                    {
                        path: '/admin/type/manager',
                        component: () => import(/* webpackChunkName: "admin" */'@/components/admin/TypeManager.vue'),
                        name: '文章类型',
                    },
                ],
            },

        ],
    },
];

// 初始化路由方法
const createRouter = () => new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
});

// 初始化加载静态路由
const router = createRouter();

// router.beforeEach((to, from, next) => {
// });

// 路由重置的方法 对router.matcher属性做修改，即新的routes就会替换老的routes
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

// 解决重复连接路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

export default router;
