import { getUserInfo } from '@/api/auth';

const state = {
  username: '',
  roles: [],
};

const mutations = {
  SET_USER(state, data) {
    state.username = data.username;
    state.roles = data.roles;
  },
};

const actions = {
  async getInfo({ commit }) {
    const res = await getUserInfo();
    commit('SET_USER', res.data);
    return res.data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
