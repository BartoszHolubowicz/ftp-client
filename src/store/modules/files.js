import axios from 'axios';

const state = {
  localDir: "",
  files: []
};

const setters = {};

const getters = {};

const actions = {
  loadFiles: ({ commit }, { url }) => {
    axios.get('/api' + url)
    .then(res => {
      commit('loadFiles', { localDir: url, files: res.data.files });
    });
  }
};

const mutations = {
  loadFiles: (state, { localDir, files }) => {
    state.localDir = localDir;
    state.files = files;
  },
}

export default {
  namespaced: true,
  state, setters, getters, actions, mutations
};