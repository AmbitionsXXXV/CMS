import { createRouter, createWebHashHistory } from 'vue-router';

import Cookies from 'js-cookie';

const login = () => import('../views/login/login.vue');
const register = () => import('../views/login/register.vue');
const home = () => import('../views/home/home.vue');
const homeView = () => import('../views/home/homeview.vue');
const itemBank = () => import('../views/questionBank/itemBank.vue');
const user = () => import('../views/user/user.vue');
const testpaperList = () => import('../views/exam/testpaperList.vue');
const testquestions = () => import('../views/exam_qs/testquestions.vue');
const articleList = () => import('../views/article/articleList.vue');
const articleTag = () => import('../views/article/articletag.vue');
const itemBankTag = () => import('../views/questionBank/itemBankTag.vue');
const feedback = () => import('../views/feedback/feedback.vue');

const routes = [
  {
    path: '/',
    redirect: '/homeView'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/homeView',
        component: homeView,
        name: 'homeView'
      },
      {
        path: '/itemBank',
        component: itemBank,
        meta: { title: '试题库' },
        name: 'itemBank'
      },
      {
        path: '/itemBankTag',
        component: itemBankTag,
        meta: { title: '标签管理' },
        name: 'itemBankTag'
      },
      {
        path: '/user',
        component: user,
        meta: { title: '用户管理' },
        name: 'user'
      },
      {
        path: '/testpaperList',
        name: 'testpaperList',
        component: testpaperList,
        meta: { title: '试卷列表' }
      },
      {
        path: '/testquestions',
        name: 'testquestions',
        component: testquestions,
        meta: { title: '试题管理' }
      },
      {
        path: '/articleList',
        name: 'articleList',
        component: articleList,
        meta: { title: '文章管理' }
      },
      {
        path: '/articleTag',
        name: 'articleTag',
        component: articleTag,
        meta: { title: '标签管理' }
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: feedback,
        meta: { title: '反馈管理' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  if (!token) {
    // 如果没有
    if (to.name == 'login' || to.name == 'register') {
      // 判断是否要去登陆界面如果是则放行
      next();
    } else {
      // 否则直接跳转登录界面
      next('/login');
    }
  } else {
    // 如果有则放行
    next();
  }
});

export default router;
