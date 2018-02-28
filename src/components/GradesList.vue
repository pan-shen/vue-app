<template>
  <div class="gradesList" v-bind:class="datas.length === 0 ? 'hide' : ''">
    <div class="listText" v-bind:class="datas.length === 0 ? 'border' : ''">本月分数清单</div>
    <div class="listNav" v-for="value in datas" v-on:click="goList(value.id)">
      <div class="time">
        <div class="timeText">{{value.week}}</div>
        <div class="timeNum">{{value.date}}</div>
      </div>
      <div class="userImg" :style="backgroundStyle(value.avtar);"></div>
      <div class="result">
        <div class="resultNum">{{value.score}}</div>
        <div class="resultText">{{value.reason}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import AppConstants from '../constants/AppConstants'
import { setMonthAndYear } from '../vuex/actions'
import { getMonth, getYear, getEid } from '../vuex/getters'
import Talk from '../talk'
export default {
  data () {
    return {
      datas: []
    }
  },
  vuex: {
    actions: {
      setMonthAndYear
    },
    getters: {
      month: getMonth,
      year: getYear,
      eid: getEid
    }
  },
  watch: {
    'month': function () {
      this.datas = []
      this.requestGradesListAjax()
    }
  },
  methods: {
    backgroundStyle (avtar) {
      return {
        'background-image': 'url("' + avtar + '")'
      }
    },
    goList (id) {
      Talk.list(id)
    },
    week (nowunix) {
      var dayunix = moment().set({'year': moment().year(), 'month': moment().month(), 'date': moment().date(), 'hour': 0, 'minute': 0, 'second': 0}).unix() * 1000
      if (nowunix > dayunix) {
        return '今天'
      } else if (dayunix >= nowunix) {
        return moment(nowunix).locale('zh-cn').format('ddd')
      }
    },
    date (nowunix) {
      var dayunix = moment().set({'year': moment().year(), 'month': moment().month(), 'date': moment().date(), 'hour': 0, 'minute': 0, 'second': 0}).unix() * 1000
      if (nowunix > dayunix) {
        return moment(nowunix).format('HH:mm')
      } else if (dayunix >= nowunix) {
        return moment(nowunix).format('MM/DD')
      }
    },
    requestGradesListAjax () {
      var gradesListUrl = AppConstants.GRADES_LIST_URL + '?eid=' + this.eid + '&month=' + this.year + this.month
      this.$http({url: gradesListUrl, method: 'GET'}).then(function (response) {
        for (var obj in response.data) {
          this.datas.push({
            avtar: response.data[obj].avtar,
            create_at: response.data[obj].create_at,
            reason: response.data[obj].reason,
            week: this.week(response.data[obj].create_at * 1000),
            date: this.date(response.data[obj].create_at * 1000),
            id: response.data[obj].id,
            score: response.data[obj].score.toFixed(2)})
        }
        Talk.listState = true
        Talk.complete(Talk.detailState, Talk.listState)
      }, function (response) {
          // error callback
        Talk.finish()
      })
    }
  },
  ready () {
    this.requestGradesListAjax()
  }
}
</script>
<style>
  .hide{
    display: none;
  }
  .gradesList{
    background-color: #fff;
    border-top: 0.5px solid #e0e0e0;
    border-bottom: 0.5px solid #e0e0e0;
  }
  .android .gradesList{
      border-top: 1px solid #e0e0e0 !important;
      border-bottom: 0.5px solid #e0e0e0 !important;
  }
  .gradesList>.listText{
    margin-left: 0.9725rem;
    font-size: 0.9725rem;
    color: #333;
    height: 2.75rem;
    border-bottom: 0.5px solid #e0e0e0;
    line-height: 2.75rem;
  }
  .android .gradesList>.listText{
    border-bottom: 1px solid #e0e0e0 !important;
  }
  .gradesList>.border{
    padding-left: 0.9725rem;
    margin-left: 0rem;
    font-size: 0.9725rem;
    color: #333;
    height: 2.75rem;
    border-bottom: 0.5px solid #e0e0e0;
    line-height: 2.75rem;
  }
  .android .gradesList>.border{
    border-bottom: 1px solid #e0e0e0 !important;
  }
  .gradesList>.listNav{
    height: 3.75rem;
    margin-left: 0.9725rem;
    overflow: hidden;
    border-bottom: 0.5px solid #e0e0e0;
  }
  .gradesList>.listNav:last-child{
    border-bottom: none !important;
  }
  .android .gradesList>.listNav:last-child{
    border-bottom: none !important;
  }
  .android .gradesList>.listNav{
    border-bottom: 1px solid #e0e0e0 !important;
  }
  .gradesList>.listNav>.time{
    color: #999;
    float: left;
  }
  .gradesList>.listNav>.time>.timeText{
    font-size: 0.9725rem;
    margin-top: 0.75rem;
    margin-bottom: 0rem;
    padding: 0rem;
    line-height: 1;
  }
  .gradesList>.listNav>.time>.timeNum{
    font-size: 0.8125rem;
    padding-top: 0.5rem;
    margin: 0rem;
    line-height: 1;
    padding-bottom: 0.4375rem;
  }
  .gradesList>.listNav>.userImg{
    float: left;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1.5rem;
    margin: 0.6725rem 1.25rem;
    background-size: cover;
  }
  .gradesList>.listNav>.result{
    float: left;
    width: 50%;
  }
  .gradesList>.listNav>.result>.resultNum{
    color: #333;
    font-size: 1.21875rem;
    margin-top: 0.45rem;
  }
  .gradesList>.listNav>.result>.resultText{
    font-size: 0.9725rem;
    color: #757575;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
