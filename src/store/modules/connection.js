import axios from 'axios';

const state = {
  connected: ['false', 'loading', 'true'][0]
};

const setters = {};

const getters = {};

const actions = {
  connect: ({ commit, dispatch, state }, { host, port, username, password }) => {
    console.log({ host, port, username, password });
    commit('setConnected', { status: 'loading' });
    axios.post('/api/remote', {
      host, port, username, password
    }).then(res => {
      commit('setConnected', { status: String(res.data.connectionSuccessful) });
      dispatch('files/loadLocalFiles', { url: '/' }, { root: true });
    });
  }
};

const mutations = {
  setConnected: (state, { status }) => {
    state.connected = status;
  }
};

export default {
  namespaced: true,
  state, setters, getters, actions, mutations
};