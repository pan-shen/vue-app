<template>
  <div class="scoreFrom">
    <div class="fromOne">
      <span>{{overview}}</span>
    </div>
    <div class="scoreMark" v-bind:class="type === 1 ? 'color' : ''">{{score}}</div>
  </div>
  <div class="scoreDetail">
    <div class="mark">
      <div class="markText" :style="backgroundStyle(avtar);"></div>
      <div class="markDetail">
        <div class="markOne">{{title}}</div>
        <div class="markDate">{{create_at}}</div>
      </div>
    </div>
    <div class="markReason" v-if="style === 1">
      <div class="reasonText">{{reason}}</div>
      <div class="reasonImg" v-bind:class="imgs.length === 0 ? 'hide' : ''">
        <div v-for="value in imgs" :style="backgroundStyle(value);" v-on:click="giveImg(value)"></div>
      </div>
    </div>
    <div class="markReason" v-if="style === 2">
      <div class="reasonText"><span>{{head}}</span>{{reason}}</div>
      <div class="reasonImg" v-bind:class="imgs.length === 0 ? 'hide' : ''">
        <div v-for="value in imgs" :style="backgroundStyle(value);" v-on:click="giveImg(value)"></div>
      </div>
    </div>
    <div class="markReason" v-if="style === 3">
      <div class="reasonText">{{reason}}</div>
      <div class="reasonImg" v-bind:class="imgs.length === 0 ? 'hide' : ''">
        <div v-for="value in imgs" :style="backgroundStyle(value);" v-on:click="giveImg(value)"></div>
      </div>
    </div>
    <div class="reasonTo" v-if="style === 1 || style === 2" v-on:click="giveId(refer_id, refer_type, task_type, score)">
      <div class="toLeft">具体详情</div>
      <div class="toRight">查看 ></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import moment from 'moment'
import Functions from '../common'
import Talk from '../talk'
import AppConstants from '../constants/AppConstants'
Vue.use(VueResource)
export default {
  data () {
    return {
      id: Functions.getUrlParameter('id'),
      score: 0,
      type: '',
      reason: '',
      avtar: '',
      create_at: '',
      imgs: [],
      overview: '',
      title: '',
      style: 1,
      refer_id: 0,
      head: '',
      refer_type: 1,
      task_type: 1
    }
  },
  methods: {
    backgroundStyle (avtar) {
      return {
        'background-image': 'url("' + avtar + '")'
      }
    },
    giveImg (url) {
      Talk.img(url)
    },
    giveId (id, rtype, ttype, score) {
      Talk.id(id, rtype, ttype, score)
    },
    requestScoreDetailAjax () {
      var scoreDetailUrl = AppConstants.SCORE_DETAIL_URL + '?id=' + this.id
      this.$http({url: scoreDetailUrl, method: 'GET'}).then(function (response) {
        console.log(response.data)
        this.style = response.data.style
        this.refer_type = response.data.refer_type
        this.task_type = response.data.task_type
        this.head = '#' + response.data.head + '#'
        this.refer_id = response.data.refer_id
        this.score = response.data.score
        if (this.score > 0) {
          this.score = '+' + this.score.toFixed(2)
        }
        this.type = response.data.type
        this.reason = response.data.reason
        this.avtar = response.data.avtar
        this.create_at = moment(response.data.create_at * 1000).format('YYYY/MM/DD HH:mm')
        this.imgs = response.data.imgs
        this.overview = response.data.overview
        this.title = response.data.title
        Talk.detailState = true
        Talk.listState = true
        Talk.complete(Talk.detailState, Talk.listState)
      }, function (response) {
          // error callback
        Talk.finish()
      })
    }
  },
  ready () {
    this.requestScoreDetailAjax()
  }
}
</script>
<style>
    .hide{
      display: none !important;
    }
    .scoreFrom{
        background-color: #fff;
        height: 9rem;
        border-bottom: 0.5px solid #e0e0e0;
        margin-bottom: 0.9725rem;
    }
    .android .scoreFrom{
      border-bottom: 1px solid #e0e0e0 !important;
    }
    .scoreFrom>.fromOne{
      font-size: 0.9725rem;
      color: #333;
      padding-top: 0.9725rem;
      margin-left: 0.9725rem;
    }
    .scoreFrom>.scoreMark{
      font-size: 3.125rem;
      color: #fe7667;
      text-align: center;
      padding-top: 1rem;
    }
    .scoreFrom>.color{
      color: #8fd675;
    }
    .scoreDetail{
        background-color: #fff;
        border-bottom: 0.5px solid #e0e0e0;
    }
    .android .scoreDetail{
      border-bottom: 1px solid #e0e0e0 !important;
    }
    .scoreDetail>.mark{
      height: 3.75rem;
      margin-left: 0.9725rem;
      border-bottom: 0.5px solid #e0e0e0;
    }
    .android .scoreDetail>.mark{
      border-bottom: 1px solid #e0e0e0 !important;
    }
    .scoreDetail>.mark>.markText{
      margin-top: 0.625rem;
      width: 2.5rem;
      height: 2.5rem;
      color: #fff;
      float: left;
      border-radius: 50%;
      line-height: 2.5rem;
      text-align: center;
      background-size: cover;
    }
    .scoreDetail>.mark>.markDetail{
      float: left;
      margin-left: 0.5rem;
    }
    .scoreDetail>.mark>.markDetail>.markOne{
      margin-top: 1rem;
      color: #333;
      font-size: 0.875rem;
      line-height: 1rem;
    }
    .scoreDetail>.mark>.markDetail>.markDate{
      margin-top: 0.2rem;
      color: #757575;
      font-size: 0.75rem;
      line-height: 1rem;
    }
    .scoreDetail>.markReason{
      margin: 0rem 0.9725rem;
    }
    .scoreDetail>.markReason>.reasonText{
      padding: 0.9725rem 0rem;
      font-size: 0.9725rem;
      color: #333;
    }
    .scoreDetail>.markReason>.reasonText>span{
      color: #2583ba;
    }
    .scoreDetail>.markReason>.reasonImg{
      margin: 0rem 0rem 0.9725rem 0rem;
      overflow: hidden;
      display:-moz-box; /* Firefox */
      display:-webkit-box; /* Safari and Chrome */
      display:box;
    }
    .scoreDetail>.markReason>.reasonImg>div{
      width: 24.25%;
      height: 5rem;
      margin: 0rem 1% 0rem 0rem;
      background-color: #999;
      background-size: cover;
    }
    .scoreDetail>.reasonTo{
      height: 2.75rem;
      border-top: 0.5px solid #e0e0e0;
    }
    .android .scoreDetail>.reasonTo{
      height: 2.75rem;
      border-top: 1px solid #e0e0e0 !important;
    }
    .scoreDetail>.reasonTo>.toLeft{
      height: 2.75rem;
      line-height: 2.75rem;
      float: left;
      margin-left: 0.9725rem;
      font-size: 0.9725rem;
      color: #333;
    }
    .scoreDetail>.reasonTo>.toRight{
      height: 2.75rem;
      line-height: 2.75rem;
      float: right;
      margin-right: 0.9725rem;
      font-size: 0.9725rem;
      color: #999;
    }
</style>
