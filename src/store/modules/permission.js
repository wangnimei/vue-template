import { asyncRoutes } from '@/router';

function hasPermission(roles, route) {
  if (route.name) {
    return roles.includes(route.name);
  }
  return true;
}

function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles);
      }
      res.push(route);
    }
  });

  return res;
}

const state = {
  accessRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.accessRoutes = routes;
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    commit('SET_ROUTES', accessedRoutes);
    return accessedRoutes;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
