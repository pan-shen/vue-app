import Vue from 'vue'
import Vuex from 'vuex'
import Functions from '../common'
import moment from 'moment'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个 object 存储应用启动时的状态
const state = {
  // TODO: 设置启动状态
  month: moment().format('YYYY年MM月').substring(5, 7),
  year: moment().format('YYYY年MM月').substring(0, 4),
  eid: Functions.getUrlParameter('eid'),
  name: ''
}

// 创建一个 object 存储 mutation 函数
const mutations = {
  // TODO: set up our mutations
  SET (state, month, year) {
    state.month = month
    state.year = year
  },
  IMG (state, name) {
    state.name = name
  }
}

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
  state,
  mutations
})
