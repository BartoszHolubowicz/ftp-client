import Vue from 'vue';
import Vuex from 'vuex';

import connection from './modules/connection';
import files from './modules/files';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    connection, files
  },
  strict: debug
});