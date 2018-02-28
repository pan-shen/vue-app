<template>
  <div class="activityTheme">
    <div class="banner" :style="backgroundStyle(img);">
      <img v-bind:src="img" style="visibility:hidden; width: 100%;display: block;"/>
    </div>
    <div class="theme">
      <p>{{title}}</p>
      <hr class='tophr'/>
      <div>
        <section><img src='../assets/time.png' /><span>活动时间：{{start_time}}－{{finish_time}}</span></section>
        <section v-show="address"><img src='../assets/address.png' /><span>活动地点：{{address}}</span></section>
        <section v-show="topic"><img src='../assets/theme.png' /><span>活动主题：{{topic}}</span></section>
        <section v-show="charge"><img src='../assets/charge.png' /><span>活动金额：{{charge}}</span></section>
        <section v-show="num"><img src='../assets/num.png' /><span>活动名额：剩余<i>{{num}}</i>名</span></section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import VueResource from 'vue-resource'
import AppConstants from '../constants/AppConstants'
import Functions from '../common'
import store from '../stores/appStore'
Vue.use(VueResource)
export default {
  data () {
    return {
      title: '',
      img: '',
      address: '',
      topic: '',
      charge: '免费',
      num: '',
      start_time: '',
      finish_time: '',
      aid: store.aid,
      uid: store.uid
    }
  },
  methods: {
    backgroundStyle (imgurl) {
      return {
        'background-image': 'url("' + imgurl + '")'
      }
    },
    requestThemeAjax (state) {
      if (state !== 'init') {
        this.componentsReload('start', 'activityTheme')
        // 组件刷新开始数据开始
      }
      var themeUrl = AppConstants.ACTIVITY_THEME_URL + '?aid=' + this.aid + '&uid=' + this.uid
      this.$http({url: themeUrl, method: 'GET'}).then(function (response) {
        try {
          if (Functions.isEmpty(response.data)) {
            throw new Error('response.data is empty!')
          }
          // console.log(response.data[0])
          this.img = response.data.img
          this.title = response.data.title
          this.start_time = moment(response.data.start_time * 1000).locale('zh-cn').format('LL')
          this.finish_time = moment(response.data.finish_time * 1000).locale('zh-cn').format('LL')
          this.address = response.data.address
          this.topic = response.data.topic
          if (response.data.charge === 0) {

          } else {
            this.charge = response.data.charge
          }
          this.num = Number(response.data.num) - Number(response.data.registed)
          if (response.data.within === 1) {
            store.setNum(response.data.num)
          } else if (response.data.within === 0) {
            store.setNum(0)
          }
          if (state === 'init') {
            this.componentsInit(true)
          } else if (state !== 'init') {
            this.componentsReload('success', 'activityTheme')
          }
        } catch (err) {
          if (state === 'init') {
            this.componentsInit(false)
          } else if (state !== 'init') {
            this.componentsReload('fail', 'activityTheme')
          }
        }
      }, function (response) {
          // error callback
        if (state === 'init') {
          this.componentsInit(false)
        } else if (state !== 'init') {
          this.componentsReload('fail', 'activityTheme')
        }
      })
    },
    componentsInit (state) {
      store.componentsInitstate(state)
    },
    componentsReload (state, componentsName) {
      store.componentsReloadState(state, componentsName)
    }
  },
  ready () {
    this.requestThemeAjax('init')
    // theme组件开始数据加载
    window.ActivityThemeRefresh = this.requestThemeAjax
    // theme组件刷新数据加载
  }
}
</script>

<style>
  body{
    background-color: #f1f1f1;
  }
  .activityTheme{
    margin: 0;
    padding: 0;
    background-color: #fff;
  }
  .banner{
    margin: 0;
    padding: 0;
    width: 100%;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .banner > img{
    visibility: hidden;
    width: 100%;
    display: block;
  }
  .theme{
    margin: 0rem 1.1875rem;
  }
  .theme > .tophr{
    margin: 0rem;
  }
  .theme > p{
    font-size: 1.125rem;
    text-align: left;
    margin: 0.9375rem 0rem;
  }
  .theme >div{
    padding: 0.625rem 0rem;
  }
  .theme >div > section{
    text-align: left;
    margin: 0.3125rem 0rem;
    font-size: 0.875rem;
  }
  .theme >div > section >img{
    vertical-align: middle;
    width: 2rem;
  }
  hr{
    margin: 0rem 1.1875rem;
    border: solid 0.5px #e1e1e1;
    border-bottom: none;
  }
  .android hr{
    border: solid 1px #e1e1e1 !important;
  }
  i{
    color: #fe9500;
    font-style: normal;
    font-size: 1rem;
  }
</style>
