import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      sidebarHide: true
    }
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'table1',
        name: 'table1',
        component: () => import('@/views/table/table1/index.vue'),
        meta: {
          title: '表格1'
        }
      },
      {
        path: 'table2',
        name: 'table2',
        component: () => import('@/views/table/table2/index.vue'),
        meta: {
          title: '表格2'
        }
      }
    ]
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'item1',
        name: 'item1',
        component: () => import('@/views/items/item1/index.vue'),
        meta: {
          title: '项目1'
        }
      },
      {
        path: 'item2',
        name: 'item2',
        component: () => import('@/views/items/item2/index.vue'),
        meta: {
          title: '项目2'
        }
      }
    ]
  },
  {
    path: '/external',
    name: 'external',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'http://www.example.com',
        component: () => {},
        meta: {
          title: '外部链接',
          isExt: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;