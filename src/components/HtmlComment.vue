<template>
  <div class="HtmlComment">
    <p class="divider"><span>{{commentNum}}条留言<span></p>
    <div class="htmlComments"  v-for="value in user">
      <div class="commentIcon" v-on:click="goHtml5Comment(value.uid, value.name)"></div>
      <div class="userInfo">
        <div class="userimg" v-on:click="goProfile(value.uid)"><div :style="backgroundStyle(value.imgurl);"></div></div>
        <div class="commentDetail">
          <div class="name" v-on:click="goProfile(value.uid)"><span>{{value.name}}</span></div>
          <div class="time">{{value.time}}</div>
          <div class="note"><span v-if="value.to_nick">回复<span>{{value.to_nick}}</span>：</span>{{value.note}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppConstants from '../constants/AppConstants'
import Functions from '../common'
import moment from 'moment'
import VueResource from 'vue-resource'
import store from '../stores/appStore'
import Vue from 'vue'
Vue.use(VueResource)
export default {
  data () {
    return {
      nid: Functions.getUrlParameter('nid'),
      commentNum: 0,
      status: true,
      id: 0,
      num: 10,
      user: []
    }
  },
  methods: {
    backgroundStyle (imgurl) {
      return {
        'background-image': 'url("' + imgurl + '")'
      }
    },
    // takeHtml5Id () {
    //   var hidUrl = AppConstants.HTML5_ID + this.hid
    //   Functions.openCustomURLinIFrame(hidUrl)
    // },
    goProfile (uid, event) {
      var iosUid = AppConstants.IOS_PROFILE + uid
      Functions.openCustomURLinIFrame(iosUid)
      this.stop(event)
    },
    goHtml5Comment (uid, name, event) {
      var uidUrl = AppConstants.HTML5_COMMENT + '?uid=' + uid + '&$name=' + name
      Functions.openCustomURLinIFrame(uidUrl)
      this.stop(event)
    },
    stop (event) {
      var e = event || window.event
      if (e && e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
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
    refreshComment () {
      this.user = []
      this.commentNum = 0
      this.id = 0
      this.getHtml5CommentAjax()
    },
    getHtml5CommentAjax () {
      var getHtml5CommentUrl = AppConstants.GET_HTML5_COMMENT_URL + '?nid=' + this.nid + '&id=' + this.id + '&num=' + this.num
      this.$http({url: getHtml5CommentUrl, method: 'GET'}).then(function (response) {
        store.states.htmlCommentState = true
        store.complete()
        this.status = true
        if (response.data[0] === undefined) {
          this.status = false
        }
        this.commentNum = this.commentNum + response.data.length
        for (var obj in response.data) {
          var avtar = 'http://image.7caijia.cn/' + response.data[obj].avtar
          this.user.push({imgurl: avtar, name: response.data[obj].nick, time: this.date(response.data[obj].create_at), nid: response.data[obj].nid, id: response.data[obj].id, to_nick: response.data[obj].to_nick, to_uid: response.data[obj].to_uid, uid: response.data[obj].uid, note: response.data[obj].content})
          console.log(response.data[obj].id)
          this.id = response.data[obj].id
        }
      }, function (response) {

      })
    }
  },
  ready () {
    this.getHtml5CommentAjax()
    window.getHtml5CommentRefresh = this.refreshComment
    var self = this
    window.onscroll = function () {
      var a = document.documentElement.clientHeight
      var b = document.body.scrollTop
      var c = document.documentElement.scrollHeight
      if (b !== 0) {
        if (a + b === c) {
          if (self.status && self.id !== '') {
            self.status = false
            self.getHtml5CommentAjax()
          }
        }
      }
    }
  }
}
</script>
<style>
.HtmlComment{
  background-color: #f1f1f1;
  min-height: 12rem;
}
.divider {
  display: table;
  white-space: nowrap;
  height: auto;
  margin: '';
  overflow: hidden;
  line-height: 1;
  text-align: center;
  padding: 1.5rem 0 0 0;
  margin: 0rem 1rem;
  color: #666;
}
.divider:after, .divider:before {
  content: '';
  display: table-cell;
  position: relative;
  top: 50%;
  width: 50%;
  background-repeat: repeat-x;
  background-image: url('../assets/_---.png')
}
.divider:before {
  background-position: right 1em top 50%;
}
.divider:after {
  background-position: left 1em top 50%;
}
.divider>span{
  padding: 0 1rem;
}
.htmlComments{
  background-color: #f1f1f1;
  position: relative;
}
.htmlComments >.commentIcon{
  position: absolute;
  right: 1.1875rem;
  top: 0.5rem;
  width: 1.2rem;
  height: 1.2rem;
  background-image: url('../assets/comment.png');
  background-size: cover;
}
.htmlComments >.userInfo{
  border-bottom: solid 1px #e0e0e0;
  padding: 0rem 1.1875rem;
  display:-moz-box; /* Firefox */
  display:-webkit-box; /* Safari and Chrome */
  display:box;
  overflow: hidden;
}
.htmlComments >.userInfo >.userimg{
  width: 2.5rem;
}
.htmlComments >.userInfo >.userimg >div{
  height: 2.5rem;
  margin: 0.625rem 0rem 0rem 0rem;
  border-radius: 1.5rem;
  background-position: center;
  background-size: cover;
  position: relative;
}
.htmlComments >.userInfo >.commentDetail{
  margin-left: 1rem;
}
.htmlComments >.userInfo >.commentDetail >.name{
  padding: 0.6rem 0rem 0rem 0rem;
  margin: 0rem;
  font-size: 0.875rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #2583ba;
}
.htmlComments >.userInfo >.commentDetail >.time{
  padding: 0rem;
  margin: 0rem;
  font-size: 0.8125rem;
  color: #757575;
}

.htmlComments >.userInfo >.commentDetail >.note{
  padding: 0.4rem 2rem 0.6rem 0rem;
  font-size: 0.9375rem;
  line-height: 1.40625rem;
  color: #333;
}
.htmlComments >.userInfo >.commentDetail >.note >span>span{
  color: #2583ba;
}
</style>
