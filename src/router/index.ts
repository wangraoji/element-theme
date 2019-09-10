import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routes: any = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
    children: [],
  },
  {
    path: '/home',
    redirect: "/home",
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: "首页", icon: "vo_home" },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/m1',
    redirect: "/demo",
    meta: { title: "模板1(列表)", icon: "vo-mod" },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/demo',
        name: 'demo',
        meta: { title: "demo", },
        component: () => import('@/views/m1/index.vue')
      },
      {
        path: '/doc',
        name: 'doc',
        meta: { title: "文档" },
        component: () => import('@/views/m1/doc.vue')
      }
    ]
  },
  {
    path: '/m2',
    redirect: "/m2",
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/m2',
        name: 'm2',
        meta: { title: "模板2(新增)", icon: "vo-mod" },
        component: () => import('@/views/m2/index.vue')
      }
    ]
  },
];
export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
