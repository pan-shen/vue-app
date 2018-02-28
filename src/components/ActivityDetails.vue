<template>
  <div class="activityDetails">
      <div class="DetailsHeader"><span></span><p>活动详情</p></div>
      <section v-bind:class="{'part': !exist}">{{{html}}}</section>
      <div class="all" v-bind:class="{'show': exist}" v-on:click="toggle">查看全部  <img src="../assets/bottom.png" /></div>
      <div class="all" v-bind:class="{'show': !exist}" v-on:click="toggle">全部收起  <img src="../assets/top.png" /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import AppConstants from '../constants/AppConstants'
import Functions from '../common'
import store from '../stores/appStore'
Vue.use(VueResource)
export default {
  data () {
    return {
      html: '',
      exist: false,
      aid: store.aid
    }
  },
  methods: {
    toggle () {
      this.exist = !this.exist
    },
    componentsInit (state) {
      store.componentsInitstate(state)
    },
    componentsReload (state, componentsName) {
      store.componentsReloadState(state, componentsName)
    },
    requestDetailsAjax (state) {
      if (state !== 'init') {
        this.componentsReload('start', 'activityDetails')
        // 组件刷新开始数据开始
      }
      var detailsUrl = AppConstants.ACTIVITY_DETAILS_URL + '?aid=' + this.aid
      this.$http({url: detailsUrl, method: 'GET'}).then(function (response) {
        try {
          if (Functions.isEmpty(response.data[0].html5)) {
            throw new Error('response.data is empty!')
          }
          this.html = response.data[0].html5
          if (state === 'init') {
            this.componentsInit(true)
          } else if (state !== 'init') {
            this.componentsReload('success', 'activityDetails')
          }
        // console.log(this.html)
        } catch (err) {
          if (state === 'init') {
            this.componentsInit(false)
          } else if (state !== 'init') {
            this.componentsReload('fail', 'activityDetails')
          }
        }
      }, function (response) {
          // error callback
        throw new Error('response.data is empty!')
      })
    }
  },
  ready () {
    this.requestDetailsAjax('init')
    window.ActivityDetailsRefresh = this.requestDetailsAjax
  }
}
</script>

<style>
  .DetailsHeader{
    margin: 0rem 1.3rem;
    border-bottom: solid 0.5px #e0e0e0;
    position: relative;
  }
  .android .DetailsHeader{
    border-bottom: solid 1px #e0e0e0 !important;
  }
  .activityDetails{
    background-color: #fff;
    margin-bottom: 1rem;
  }
  .activityDetails pre{
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }
  .activityDetails >.part{
    height: 14rem;
    overflow: hidden;
  }
  .activityDetails .wait{
    line-height: 14rem;
    text-align: center;
  }
  .activityDetails >.show{
    display: none;
  }
  .activityDetails >section >.img{
    margin: 0rem 1.1875rem 1.25rem 1.1875rem;
  }
  .activityDetails >section >.img >img{
    width: 100%;
    display: block;
  }
  .activityDetails >section >.text{
    margin: 0rem 1.1875rem 0.703125rem 1.1875rem;
  }
  .activityDetails >section >.text >p{
    margin: 0px 0px;
    color: #757575;
    font-size: 0.9375rem;
    text-align: justify;
    line-height: 1.40625rem;
  }
  .activityDetails >section >.title{
    position: relative;
    margin: 0rem 1.1875rem 0.9375rem 1.1875rem;
    font-size: 0.9375rem;
    color: #333;
  }
  .activityDetails >section >.title >span{
    position: absolute;
    left: 0rem;
    top: 0.1rem;
    width: 0.25rem;
    height: 0.75rem;
    display: block;
    background-color: #85c210;
  }
  .activityDetails >section >.title >p{
    margin-left: 1rem;
    line-height: 1;
  }
  .activityDetails >.all{
    text-align: center;
    color: #2583ba;
    font-size: 0.875rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: solid 0.5px #e0e0e0;
  }
  .android .activityDetails >.all{
    border-bottom: solid 1px #e0e0e0 !important;
  }
  .activityDetails >.all >img{
    width: 1.3rem;
    vertical-align: middle;
    margin-top: -0.2rem;
  }
  .DetailsHeader >span{
    display: block;
    width: 0.25rem;
    height: 0.9375rem;
    background-color: #85c210;
    position: absolute;
    left: 0rem;
    top: 1.23rem;
  }
  .DetailsHeader >p{
    font-size: 1rem;
    color: #333;
    margin: 0rem;
    text-align: left;
    margin-left: 1rem;
    padding-top: 1.1875rem;
    padding-bottom: 0.9375rem;
    line-height: 1;
  }
</style>
