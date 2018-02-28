<template>
  <div class="activityComments"  v-for="value in user">
    <div class="userInfo" v-on:click="writeComment(value.feed_id)">
      <div class="userimg" :style="backgroundStyle(value.imgurl);" v-on:click="goProfile(value.uid)"><img src='../assets/volunteers.png' v-if=" value.identity == 1 " /></div>
      <p class="name"><span v-on:click="goProfile(value.uid)">{{value.name}}</span></p>
      <p class="time">{{value.zone_name}}{{value.house_code}}幢 {{value.time}}</p>
    </div>
    <p class="note" v-on:click="writeComment(value.feed_id)">{{value.note}}</p>
    <div class="noteimgs" v-on:click="writeComment(value.feed_id)">
      <div class="imgnote" :style="backgroundStyle(image);" v-for="image in value.images"></div>
    </div>
    <section>
      <table>
        <tr v-if="value.zans !== 0 && value.pingluns !== 0">
          <td v-on:click="value.zans=((value.myzan=zan(value.myzan, value.feed_type, value.feed_id, value.name)) ===1?(value.zans+1):(value.zans-1))" v-bind:class="{'green': (value.myzan ===1?true:false)}"><img src='../assets/greengood.png' v-bind:class="{'none': (value.myzan ===0?true:false)}" /><img src='../assets/tintgood.png' v-bind:class="{'none': (value.myzan ===1?true:false)}"/>{{value.zans}}</td>
          <td v-on:click="writeComment(value.feed_id)"><img src='../assets/comment.png' />{{value.pingluns}}</td>
        </tr>
        <tr v-if="value.zans === 0 && value.pingluns !== 0">
          <td v-on:click="value.zans=((value.myzan=zan(value.myzan, value.feed_type, value.feed_id, value.name)) ===1?(value.zans+1):(value.zans-1))" v-bind:class="{'green': (value.myzan ===1?true:false)}"><img src='../assets/greengood.png' v-bind:class="{'none': (value.myzan ===0?true:false)}" /><img src='../assets/tintgood.png' v-bind:class="{'none': (value.myzan ===1?true:false)}"/>赞</td>
          <td v-on:click="writeComment(value.feed_id)"><img src='../assets/comment.png' />{{value.pingluns}}</td>
        </tr>
        <tr v-if="value.zans !== 0 && value.pingluns === 0">
          <td v-on:click="value.zans=((value.myzan=zan(value.myzan, value.feed_type, value.feed_id, value.name)) ===1?(value.zans+1):(value.zans-1))" v-bind:class="{'green': (value.myzan ===1?true:false)}"><img src='../assets/greengood.png' v-bind:class="{'none': (value.myzan ===0?true:false)}" /><img src='../assets/tintgood.png' v-bind:class="{'none': (value.myzan ===1?true:false)}"/>{{value.zans}}</td>
          <td v-on:click="writeComment(value.feed_id)"><img src='../assets/comment.png' />评论</td>
        </tr>
        <tr v-if="value.zans === 0 && value.pingluns === 0">
          <td v-on:click="value.zans=((value.myzan=zan(value.myzan, value.feed_type, value.feed_id, value.name)) ===1?(value.zans+1):(value.zans-1))" v-bind:class="{'green': (value.myzan ===1?true:false)}"><img src='../assets/greengood.png' v-bind:class="{'none': (value.myzan ===0?true:false)}" /><img src='../assets/tintgood.png' v-bind:class="{'none': (value.myzan ===1?true:false)}"/>赞</td>
          <td v-on:click="writeComment(value.feed_id)"><img src='../assets/comment.png' />评论</td>
        </tr>
      </table>
    </section>
  </div>
  <div id="wait"><img src='../assets/wait.gif' /></div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import store from '../stores/appStore'
import AppConstants from '../constants/AppConstants'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
  data () {
    return {
      status: true,
      refer_id: 0,
      aid: store.aid,
      uid: store.uid,
      imgexist: true,
      user: []
    }
  },
  methods: {
    backgroundStyle (imgurl) {
      return {
        'background-image': 'url("' + imgurl + '")'
      }
    },
    date (nowunix) {
      nowunix = nowunix * 1000
      var dayunix = moment().set({'year': moment().year(), 'month': moment().month(), 'date': moment().date(), 'hour': 0, 'minute': 0, 'second': 0}).unix() * 1000
      var yesterdayunix = moment().set({'year': moment().year(), 'month': moment().month(), 'date': moment().subtract(1, 'days').date(), 'hour': 0, 'minute': 0, 'second': 0}).unix() * 1000

      var yearunix = moment().set({'year': moment().year(), 'month': 0, 'date': 1, 'hour': 0, 'minute': 0, 'second': 0}).unix() * 1000
      if (nowunix > dayunix) {
        return moment(nowunix).format('HH:mm')
      } else if (dayunix >= nowunix && nowunix > yesterdayunix) {
        return '昨天' + moment(nowunix).format('HH:mm')
      } else if (yesterdayunix >= nowunix && nowunix > yearunix) {
        return moment(nowunix).format('MM-DD,HH:mm')
      } else if (yearunix >= nowunix) {
        return moment(nowunix).format('YYYY-MM-DD,HH:mm')
      }
    },
    requestCommentsAjax (state) {
      var commentsUrl = AppConstants.ACTIVITY_COMMENTS_URL + '?aid=' + this.aid + '&uid=' + this.uid + '&num=10&id=' + this.refer_id
      if (state !== 'init') {
        this.componentsReload('start', 'activityComments')
        // 组件刷新开始数据开始
        commentsUrl = AppConstants.ACTIVITY_COMMENTS_URL + '?aid=' + this.aid + '&uid=' + this.uid + '&num=10&id=0'
        this.user.splice(0, this.user.length)
      }
      this.$http({url: commentsUrl, method: 'GET', beforeSend () {
        document.getElementById('wait').style.display = 'block'
      }}).then(function (response) {
        for (var obj in response.data) {
          if (response.data[obj].images.length === 0) {
            // hidden imgs
          } else if (response.data[obj].images.length > 0 && response.data[obj].images.length < 5) {

          }
          this.user.push({images: response.data[obj].images, identity: response.data[obj].identity, house_code: parseInt(response.data[obj].house_code / 1000000), imgurl: response.data[obj].avtar, name: response.data[obj].nick, zone_id: response.data[obj].zone_id, time: this.date(response.data[obj].create_at), note: response.data[obj].content, pingluns: response.data[obj].pingluns, zans: response.data[obj].zans, myzan: response.data[obj].myzan, feed_type: response.data[obj].feed_type, refer_id: response.data[obj].refer_id, zone_name: response.data[obj].zone_name, uid: response.data[obj].uid, feed_id: response.data[obj].feed_id})
          this.refer_id = response.data[obj].refer_id
        }
        this.status = true
        if (response.data[0] === undefined) {
          this.status = false
        }
        if (state === 'init') {
          this.componentsInit(true)
        } else if (state !== 'init') {
          this.componentsReload('success', 'activityComments')
        }
        document.getElementById('wait').style.display = 'none'
      }, function (response) {
          // error callback
        if (state === 'init') {
          this.componentsInit(false)
        } else if (state !== 'init') {
          this.componentsReload('fail', 'activityComments')
        }
        document.getElementById('wait').style.display = 'none'
      })
    },
    goProfile (uid, event) {
      if (store.apptype === 'ios') {
        var iosUid = AppConstants.IOS_PROFILE + uid
        var iframe
        iframe = document.createElement('IFRAME')
        iframe.setAttribute('src', iosUid)
        document.documentElement.appendChild(iframe)
        iframe.parentNode.removeChild(iframe)
        iframe = null
      } else if (store.apptype === 'android') {
        window.AndroidApp.goProfile(String(uid))
      }
      var e = event || window.event
      if (e && e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }
    },
    writeComment (cid) {
      if (store.apptype === 'ios') {
        var iosCid = AppConstants.IOS_COMMENT + cid
        var iframe
        iframe = document.createElement('IFRAME')
        iframe.setAttribute('src', iosCid)
        document.documentElement.appendChild(iframe)
        iframe.parentNode.removeChild(iframe)
        iframe = null
      } else if (store.apptype === 'android') {
        window.AndroidApp.goComment(String(cid))
      }
    },
    componentsInit (state) {
      store.componentsInitstate(state)
    },
    componentsReload (state, componentsName) {
      store.componentsReloadState(state, componentsName)
    },
    openCustomURLinIFrame (src) {
      var iframe
      iframe = document.createElement('IFRAME')
      iframe.setAttribute('src', src)
      document.documentElement.appendChild(iframe)
      iframe.parentNode.removeChild(iframe)
      iframe = null
    },
    zan (myzan, feedType, feedId, name) {
      var zans = myzan
      if (myzan === 1) {
        // 取消赞
        var nozanurl = AppConstants.ACTIVITY_COMMENTS_LIKE_URL + '?fid=' + feedId + '&uid=' + this.uid
        this.$http({url: nozanurl, method: 'GET'}).then(function (response) {
        }, function (response) {
        })
        zans--
      } else if (myzan === 0) {
        // 点赞
        var zanurl = AppConstants.ACTIVITY_COMMENTS_DISLIKE_URL + '?id=' + feedId + '&uid=' + this.uid + '&nick=' + name + '&type=1'
        this.$http({url: zanurl, method: 'GET'}).then(function (response) {
        }, function (response) {
        })
        zans++
      }
      // console.log(zans)
      return zans
    }
  },
  ready () {
    this.requestCommentsAjax('init')
    window.ActivityCommentsRefresh = this.requestCommentsAjax
    var self = this
    window.onscroll = function () {
      var a = document.documentElement.clientHeight
      var b = document.body.scrollTop
      var c = document.documentElement.scrollHeight
      if (b !== 0) {
        if (a + b === c) {
          if (self.status && this.refer_id !== '') {
            self.status = false
            self.requestCommentsAjax('init')
          }
        }
      }
    }
  }
}
</script>
<style>
  .activityComments{
    background-color: #fff;
    margin-bottom: 1rem;
  }
  .activityComments >.userInfo{
    border-bottom: solid 0.5px #e0e0e0;
    margin: 0rem 1.1875rem;
    overflow: hidden;
    height: 3.75rem;
  }
  .android .activityComments >.userInfo{
    border-bottom: solid 1px #e0e0e0 !important;
  }
  .activityComments >.userInfo >.userimg{
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.625rem 0.9375rem 0.625rem 0rem;
    border-radius: 1.5rem;
    float: left;
    background-position: center;
    background-size: cover;
    position: relative;
  }
  .activityComments >.userInfo >.userimg > img{
    position: absolute;
    width: 1.2rem;
    right: 0rem;
    bottom: 0rem;
  }
  .activityComments >.userInfo >.name{
    padding: 0.6rem 0rem 0.225rem 0rem;
    margin: 0rem;
    font-size: 0.875rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #2583ba;
  }
  .activityComments >.userInfo >.time{
    padding: 0rem;
    margin: 0rem;
    font-size: 0.8125rem;
    color: #757575;
  }

  .activityComments >.note{
    /*margin: 0rem 1.1875rem 0rem 1.1875rem;*/
    /*padding: 0.703125rem 0rem;*/
    font-size: 0.9375rem;
    line-height: 1.40625rem;
    color: #333;
    margin: 0.703125rem 1.1875rem;
  }
  .activityComments >section > .good{
    text-align: center;
    width: 49%;
    display: inline-block;
    border-right: solid 0.5px #e0e0e0;
    font-size: 0.875rem;
    height: 1.25rem;
    line-height: 1.25rem;
  }
  .android .activityComments >section > .good{
    border-right: solid 1px #e0e0e0 !important;
  }
  .green{
    color: #85c210 !important;
  }
  .none{
    display: none;
  }
  .activityComments >section{
    border-top: solid 0.5px #e0e0e0;
    border-bottom: solid 0.5px #e0e0e0;
    padding: 0.35rem 0rem 0.35rem 0rem;
  }
  .android .activityComments >section{
    border-top: solid 1px #e0e0e0 !important;
    border-bottom: solid 1px #e0e0e0 !important;
  }
  .activityComments >section > table {
    width: 100%;
    text-align: center;
  }
  .activityComments >section > table > tbody >tr >td{
    width: 50%;
    padding: 0rem;
    color: #999999;
  }
  .activityComments >section > table > tbody >tr >td >img{
    width: 1rem;
    margin-right: 0.7rem;
    vertical-align: middle;
    margin-top: -0.19rem;
  }
  .activityComments >section > table > tbody >tr >td:first-child{
    border-right: solid 0.5px #e0e0e0;
    font-size: 0.85rem;
  }
  .activityComments >section > table > tbody >tr >td:last-child{
    border-left: solid 0.5px #fff;
    font-size: 0.85rem;
  }
  .android .activityComments >section > table > tbody >tr >td:first-child{
    border-right: solid 1px #e0e0e0 !important;
  }
  .android .activityComments >section > table > tbody >tr >td:last-child{
    border-left: solid 1px #fff !important;
  }
  /*.activityComments >section > div >img{
    width: 1.4rem;
    margin-right: 0.7rem;
    vertical-align: middle;
  }
  .activityComments >section > .comment >a{
    color: #333;
    text-decoration: none;
  }
  .activityComments >section > .comment >a >img{
    width: 1.4rem;
    margin-right: 0.7rem;
    vertical-align: middle;
  }
  .activityComments >section > .comment{
    text-align: center;
    width: 49%;
    display: inline-block;
    font-size: 0.875rem;
    height: 1.25rem;
    line-height: 1.25rem;
  }*/
  .noteimgs{
    margin: 0 1.1875rem;
    display:-moz-box; /* Firefox */
    display:-webkit-box; /* Safari and Chrome */
    display:box;
    overflow: hidden;
  }
  .none{
    display: none;
  }
  .imgnote{
    width: 24.25%;
    height: 5rem;
    margin: 0rem 1% 0rem 0rem;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 0.703125rem;
    background-size: cover;
  }
  .noteimgs:last-child{
    margin: 0rem;
  }
  #wait{
    text-align: center;
    display: none;
  }
  #wait > img{
    width: 1.3rem;
  }
</style>
