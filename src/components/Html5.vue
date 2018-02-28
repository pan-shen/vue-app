<template>
  <div class="Html5">
    {{{html5}}}
  </div>
</template>

<script>
import AppConstants from '../constants/AppConstants'
import Functions from '../common'
import VueResource from 'vue-resource'
import store from '../stores/appStore'
import Vue from 'vue'
Vue.use(VueResource)
export default {
  data () {
    return {
      id: Functions.getUrlParameter('id'),
      html5: ''
    }
  },
  methods: {
    requestHtml5Ajax () {
      var html5Url = AppConstants.HTML5_URL + '?id=' + this.id
      this.$http({url: html5Url, method: 'GET'}).then(function (response) {
        store.states.html5State = true
        store.complete()
        this.html5 = response.data[0].content
      }, function (response) {

      })
    }
  },
  ready () {
    this.requestHtml5Ajax()
    var apiUrl = 'http://api.7caijia.cn/html' + '?id=' + this.id
    this.$http({url: apiUrl, method: 'GET'}).then(function (response) {

    }, function (response) {

    })
  }
}
</script>
<style>

</style>
