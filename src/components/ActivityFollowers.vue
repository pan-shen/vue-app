<template>
  <div class="activityFollowers" v-on:click="goFollowerList(aid)" v-bind:class="{'height': !none}">
    <hr>
    <ul>
      <li :style="backgroundStyle(value.imgurl);" v-for="value in img">
        <img src='../assets/volunteers.png' v-if=" value.identity == 1 " />
      </li>
    </ul>
    <p>{{registed}}人已报名</p>
    <img src='../assets/right.png'/>
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
      registed: '',
      img: [],
      aid: store.aid,
      none: true
    }
  },
  methods: {
    backgroundStyle (imgurl) {
      return {
        'background-image': 'url("' + imgurl + '")'
      }
    },
    height () {
      return {
        'height': '3rem'
      }
    },
    requestFollowersAjax (state) {
      if (state !== 'init') {
        this.componentsReload('start', 'activityFollowers')
        // 组件刷新开始数据开始
      }
      var followersUrl = AppConstants.ACTIVITY_FOLLOWERS_URL + '?aid=' + this.aid
      // var followersUrl = AppConstants.ACTIVITY_FOLLOWERS_URL
      this.$http({url: followersUrl, method: 'GET'}).then(function (response) {
        try {
          if (!Functions.isEmpty(response.data)) {
            this.none = !this.none
          }
          if (state === 'init') {
            this.componentsInit(true)
          } else if (state !== 'init') {
            this.componentsReload('success', 'activityFollowers')
          }
          this.registed = response.data.length
          for (var length in response.data) {
            this.img.push({imgurl: response.data[length].avtar, identity: response.data[length].identity})
          }
          this.img = this.img.reverse()
        } catch (err) {
          if (state === 'init') {
            this.componentsInit(false)
          } else if (state !== 'init') {
            this.componentsReload('fail', 'activityFollowers')
          }
        }
      }, function (response) {
          // error callback
        if (state === 'init') {
          this.componentsInit(false)
        } else if (state !== 'init') {
          this.componentsReload('fail', 'activityFollowers')
        }
      })
    },
    goFollowerList (aid) {
      if (store.apptype === 'ios') {
        var iosAid = AppConstants.IOS_FOLLOWERLIST + aid
        var iframe
        iframe = document.createElement('IFRAME')
        iframe.setAttribute('src', iosAid)
        document.documentElement.appendChild(iframe)
        iframe.parentNode.removeChild(iframe)
        iframe = null
      } else if (store.apptype === 'android') {
        window.AndroidApp.goFollowerList(String(aid))
      }
    },
    componentsInit (state) {
      store.componentsInitstate(state)
    },
    componentsReload (state, componentsName) {
      store.componentsReloadState(state, componentsName)
    }
  },
  ready () {
    this.requestFollowersAjax('init')
    window.ActivityFollowersRefresh = this.requestFollowersAjax
  }
}
</script>

<style>
  .height{
    height: 3rem !important;
  }
  .activityFollowers{
    margin-bottom: 1rem;
    border-bottom: solid 0.5px #e0e0e0;
    background-color: #fff;
    position: relative;
    height: 0rem;
    overflow: hidden;
  }
  .android .activityFollowers{
    border-bottom: solid 1px #e0e0e0 !important;
  }
  .activityFollowers >ul{
    padding: 0px;
    text-align: left;
    margin: 0rem 0rem 0rem 1.1875rem;
    width: 60%;
  }
  .activityFollowers >ul >li{
    display: inline-block;
    width: 1.75rem;
    height: 1.75rem;
    margin: 0.625rem 0.625rem 0.625rem 0rem;
    background-position:center;
    background-repeat: no-repeat;
    border-radius: 1rem;
    background-size: cover;
    position: relative;
  }
  .activityFollowers >ul >li >img{
    position: absolute;
    width: 0.9rem;
    right: 0rem;
    bottom: 0rem;
  }
  .activityFollowers  >p{
    font-size: 0.8125rem;
    position: absolute;
    right: 2.4rem;
    top: 0rem;
    line-height: 3rem;
    margin: 0rem;
  }
  .activityFollowers  >img{
    width: 1.5rem;
    position: absolute;
    top: 0.7rem;
    right: 1rem;
  }
</style>
