import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const moduleRoutes: Array<RouteRecordRaw> = [
    {
        name: 'personal',
        path: '/personal',
        meta: {
            title: '个人',
        },
        component: () => import('@/view/personal/index.vue'),
    },
    {
        name: 'mission',
        path: '/mission',
        meta: {
            title: '任务',
        },
        component: () => import('@/view/mission/index.vue'),
    },
    {
        name: 'addMission',
        path: '/addMission',
        meta: {
            title: '新增任务',
        },
        component: () => import('@/view/mission/add.vue'),
    },
];

export default moduleRoutes;
