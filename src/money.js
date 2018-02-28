import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'

Vue.use(VueRouter)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

configRouter(router)

const App = Vue.extend(require('./Main.vue'))
router.start(App, 'body')
