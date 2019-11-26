import axios from 'axios';

const state = {
  localDir: "",
  files: []
};

const setters = {};

const getters = {};

const actions = {
  loadLocalFiles: ({ commit }, { url }) => {
    axios.get('/api/local' + url)
    .then(res => {
      commit('loadLocalFiles', { localDir: url, files: res.data.files });
    });
  }
};

const mutations = {
  loadLocalFiles: (state, { localDir, files }) => {
    state.localDir = localDir;
    state.files = files;
  },
}

export default {
  namespaced: true,
  state, setters, getters, actions, mutations
};