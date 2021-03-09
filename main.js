import Vue from 'vue'
import App from './App'

import $H from "common/lib/request.js"
Vue.prototype.$H = $H

import store from "./store/index.js"
Vue.prototype.$store = store
import io from 'common/lib/weapp.socket.io.js'
Vue.prototype.socket = io('http://localhost:8000')
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
