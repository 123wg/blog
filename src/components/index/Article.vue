/**
* @Description: 文章展示页面
* @Author: wanggang
* @Date: 2020-08-12 19:43:50
**/

<template>
    <div class="content">
        <div class="con-item" v-for="(item,index) in  articleList" :key="index" @click="toContent(item)">
            <div class="item-bg">
                <img :src="item.coverId.path">
            </div>
            <div class="item-type pad">
                <span class="type">{{item.typeId.name}}</span>
            </div>
            <div class="item-title pad">{{item.title}}</div>
            <!-- 后期添加文章摘要 -->
            <div class="item-con pad">
                {{item.abstract}}
            </div>
            <div class="item-time pad">{{item.createTime.substr(0,10)}}</div>
        </div>
        <div class="con-page">
            <div class="left page-item" @click="changePage('back')">
                <span class="icon el-icon-back"></span>
            </div>
            <div class="middle page-item">
                <span class="icon">{{page.pageNum}}/{{page.pages}}</span>
            </div>
            <div class="right page-item" @click="changePage('go')">
                <span class="icon el-icon-right"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            articleList: [],
            page: {
                pages: 1, // 总页数
                pageNum: 1, // 当前页
                pageSize: 12, // 每页数
            },
        };
    },
    computed: {
        typeId() {
            return this.$store.getters.typeId;
        },
        scrollElement() {
            return document.querySelector('.el-scrollbar__wrap');
        },
    },
    watch: {
        typeId() {
            this.getData();
        },
    },
    created() {
        this.getData();
    },
    mounted() {

    },
    destroyed() {},
    methods: {
        /**
    *@description: 获取所有文章
    *@param{}
    *@return:
    */
        getData() {
            const param = {
                pageNum: this.page.pageNum,
                pageSize: this.page.pageSize,
            };
            if (this.typeId !== '') { param.typeId = this.typeId; }
            this.$api.article.list(param, (res) => {
                if (res.success) {
                    // console.log(res);
                    this.articleList = res.data.docs;
                    this.page.total = res.data.total;
                    this.page.pages = res.data.pages;
                }
            });
        },
        /**
        *@description: 页面滑动
        *@param{}
        *@return:
        */
        slideup(cur, tar, step) {
            let scrollTop = cur;
            if (cur - tar >= step) {
                scrollTop -= step;
            } else {
                scrollTop = tar;
            }
            this.scrollElement.scrollTop = scrollTop;
            if (cur > scrollTop) {
                requestAnimationFrame(this.slideup.bind(this, scrollTop, tar, step));
            }
        },
        /**
        *@description: 跳转详情页
        *@param{}
        *@return:
        */
        toContent(item) {
            this.$router.push({
                path: `/content/${item.id}`,
            });
        },
        /**
        *@description: 改变分页
        *@param{}
        *@return:
        */
        changePage(type) {
            if (type === 'back' && this.page.pageNum > 1) {
                this.page.pageNum -= 1;
                this.getData();
                // 滚上来
                this.slideup(this.scrollElement.scrollTop, 0, 100);
            } else if (type === 'go' && this.page.pageNum < this.page.pages) {
                this.page.pageNum += 1;
                this.getData();
                // 滚上来
                this.slideup(this.scrollElement.scrollTop, 0, 100);
            }
        },
    },
};
</script>
<style lang='scss' scoped>
 .content {
        color: #B4B4B4;
        width: 100%;
        height: auto;
        padding: 0 vw(300) vh(50) vw(300);
        box-sizing: border-box;
        justify-content: space-between;
        flex-wrap: wrap;
        display: flex;
        .con-item{
            margin-top: vh(40);
            width: vw(373);
            height: auto;
            border-radius: vw(10);
            border: 1px solid #000;
            padding-bottom: vh(5);
            overflow: hidden;
            cursor: pointer;
            transition: all .4s;

            // &:hover {
            //     transition: all .3s;
            //     transform: translate3d(vw(-1),vw(-1),0) scale(1.05);
            //     box-shadow: 0 0 0 transparent;
            // }
            .item-bg{
                height:vh(220);
                background-size: 100% 100%;
                background-repeat: no-repeat;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .item-type{
                margin-top: vh(5);
                height: vh(40);
                line-height: vh(40);
                .type {
                    text-align: center;
                    padding: vh(5) vw(15);
                    border-radius: vw(15);
                    background: #224D5B;
                }
            }
            .item-title {
                height: vh(40);
                line-height: vh(40);
                font-size: vw(18);
                font-weight: 600;
            }
            .item-time {
                border-top: 1px solid rgba(255,255,255,0.25);
                margin-top: vh(5);
                height: vh(50);
                line-height: vh(50);
                font-size: vw(16);
                font-weight: 600;
            }
            .item-con{
                font-size: vw(14);
                height: vh(125);
                overflow: hidden;
                margin-bottom: vh(20);
            }
            .pad {
                padding: 0 vw(15);
            }
        }
        .con-page {
            margin-top: vh(30);
            width: 100%;
            // height: vh(150);
            display: flex;
            justify-content: space-between;
            .page-item {
                width: vw(100);
                height:vw(100);
                background: #000;
                border-radius: vw(100);
                font-size: vw(30);
                cursor: pointer;
                .icon {
                    position: relative;
                    display: inline-block;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            .middle {
                background: none !important;
                font-size: vw(16);
            }
        }
    }
</style>
