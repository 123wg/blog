/* eslint-disable*/
/**
* @Description: 重写keep-alive组件 能够通过组件名称手动删除缓存的组件
* @Author: wanggang
* @Date: 2020-05-28 13:54:05
**/
import Vue from 'vue';
import _remove from 'lodash/remove';

const cache = {};
const keys = [];

/**
 * 通过组件名来查找到他的缓存 key
 * @param {string} name
 * @return {string}
 */
const findKeyByName = (name) => {
    for (const key of Object.keys(cache)) {
        const v = cache[key];
        if (v && v.componentOptions &&
            v.componentOptions.Ctor &&
            v.componentOptions.Ctor.options &&
            v.componentOptions.Ctor.options.name === name) {
            return key;
        }
    }
};


/**
 * 通过组件名来移除一个缓存
 *  FIXME 修改移除时候的值
 * @param {string} name
 */
export const removeCacheByName = (name) => {
    if (!name) {
        return;
    }

    const key = findKeyByName(name);
    if (!key) {
        return;
    }


    cache[key].componentInstance.$destroy();
    // console.log(cache);
    delete cache[key];
    _remove(keys, i => i === key);


    // 判断Patch 如果没有孩子的话 就删除
    Object.keys(cache).forEach(item=>{
        const preKey = findKeyByName('Patch');
        if((preKey &&
            cache[preKey].componentInstance.$children[0] &&
            cache[preKey].componentInstance.$children[0].$children.length===0)||
            preKey && cache[preKey].componentInstance.$children.length===0) {
            cache[preKey].componentInstance.$destroy();
            delete cache[preKey];
            _remove(keys, i => i === preKey);
            // console.log('执行');
        }
    })
    // console.log(cache);
};


// TODO 因为重写后，无法在 vue devtools 中的组件数中看到该组件下缓存的组件
// 所以开发环境下，除了测试缓存效果，尽量不要开启路由的缓存
export default Object.assign({}, Vue.options.components.KeepAlive, {
    name: 'LzKeepAlive',
    created() {
        this.cache = cache;
        this.keys = keys;
    },
    destroyed() {},
});
