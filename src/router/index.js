import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import { getToken, removeToken } from '@/utils/auth';
import store from '@/store';

const whiteList = ['/login'];

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Index.vue'),
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue'),
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/about/Index.vue'),
  // },
  // {
  //   path: '*',
  //   redirect: '/404',
  // },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404/Index.vue'),
  },
];

export const asyncRoutes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/about/Index.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.state.user.roles.length > 0;

      if (hasRoles) {
        if (to.matched.length === 0) {
          next('/404');
        } else {
          next();
        }
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo');
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          // dynamically add accessible routes
          router.addRoutes(accessRoutes);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          removeToken();
          next('/login');
          NProgress.done();
        }
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next();
  } else {
    // other pages that do not have permission to access are redirected to the login page.
    next('/login');
    NProgress.done();
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
