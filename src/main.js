import Vue from 'vue'
import App from './App.vue'

import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	sessionStorage.setItem('store', JSON.stringify(state));
});
