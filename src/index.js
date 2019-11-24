import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';

Vue.use(Fragment.Plugin);

var app = new Vue({
  el: '#app',
  render: function(createComponent) {
    return createComponent(App);
  }
})

export default app;