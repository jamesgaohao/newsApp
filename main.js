import App from './App.vue'

const host = 'http://bailicaicai.cn/';

// #ifndef VUE3
import Vue from 'vue'
import ElementUI from element-ui
import element-ui/lib/theme-chalk/index.css
Vue.config.productionTip = false
Vue.prototype.$host = host;
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.use(ElementUI)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
