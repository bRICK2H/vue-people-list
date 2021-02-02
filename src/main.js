import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('beforeunload', e => {
  const checkbox_group = store.getters['filters/GET_CHECKBOX_GROUP'];
  const is_show_groups_checkbox = Object.entries(checkbox_group)
    .reduce((acc, curr) => {
      const [ type, { isShow } ] = curr;
      acc[type] = isShow;
      return acc;
    }, {});

  localStorage.setItem(
    'is_show_groups_checkbox',
    JSON.stringify(is_show_groups_checkbox)
  );
})