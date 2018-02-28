<template>
  <div class="gradesDetail">
    <div class="totalScore">
      <p class="scoreText">本月总得分</p>
      <p class="score"><span class="scoreNum">{{score}}</span><span class="scoreLevel"></span></p>
    </div>
    <div class="scoreClass">
      <div class="row1">
        <div><div class="color1"><div><p>任务</p></div></div><p>{{score1}}</p></div>
        <div><div class="color2">
          <div>
              <div>业主</div>
              <div>满意度</div>
          </div></div><p>{{score2}}</p></div>
        <div v-if="type === 1 || type === 2"><div class="color3"><div>
          <div>指标</div>
          <div>得分</div>
        </div></div><p>{{score3}}</p></div>
        <div v-if="type === 4"><div class="color3"><div>
          <div>日常</div>
          <div>服务</div>
        </div></div><p>{{score3}}</p></div>
      </div>
    </div>
    <!-- <div class="suppliers">
      <div class="supplier">
        <span class="supplierName">家财物业：</span>
        <span class="supplierLevel">合格</span>
      </div>
      <div class="supplierDetail">
        查看  >
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import AppConstants from '../constants/AppConstants'
import { setMonthAndYear } from '../vuex/actions'
import { getMonth, getYear, getEid } from '../vuex/getters'
import Talk from '../talk'
Vue.use(VueResource)
export default {
  data () {
    return {
      score: 0,
      score1: 0,
      score2: 0,
      score3: 0,
      type: 0
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
      this.requestGradesDetailAjax()
    }
  },
  methods: {
    requestGradesDetailAjax () {
      var gradesDetailUrl = AppConstants.GRADES_DETAIL_URL + '?eid=' + this.eid + '&month=' + this.year + this.month
      this.$http({url: gradesDetailUrl, method: 'GET'}).then(function (response) {
        this.score1 = response.data.score1.toFixed(2)
        this.score2 = response.data.score2.toFixed(2)
        this.score3 = response.data.score3.toFixed(2)
        this.score = response.data.score.toFixed(2)
        this.type = response.data.type
        console.log(response.data)
        Talk.detailState = true
        Talk.complete(Talk.detailState, Talk.listState)
      }, function (response) {
          // error callback
        Talk.finish()
      })
    }
  },
  ready () {
    this.requestGradesDetailAjax()
  }
}
</script>
<style>
    .gradesDetail{
        background-color: #fff;
        margin-bottom: 0.9725rem;
        border-bottom: 0.5px solid #e0e0e0;
    }
    .android .gradesDetail{
        border-bottom: 1px solid #e0e0e0 !important;
    }
    .gradesDetail>.totalScore{
      height: 3.75rem;
      margin: 0rem 0rem 0rem 0.9375rem;
      border-bottom: 0.5px solid #e0e0e0;
    }
    .android .gradesDetail>.totalScore{
      border-bottom: 1px solid #e0e0e0 !important;
    }
    .gradesDetail>.totalScore>.scoreText{
      float: left;
      font-size: 1rem;
      color: #333333;
      line-height: 3.75rem;
      margin: 0;
    }
    .gradesDetail>.totalScore>.score{
      float: right;
      margin: 0;
      line-height: 3.75rem;
      width: 4.4rem;
      margin-right: 1.5rem;
    }
    .gradesDetail>.totalScore>.score>.scoreNum{
      font-size: 1.5625rem;
      color: #ffb772;
      display: block;
      float: right;
    }
    .gradesDetail>.totalScore>.score>.scoreLevel{
      font-size: 0.8125rem;
      color: #ffb772;
      display: block;
    }
    /*.gradesDetail>.scoreClass{
      margin: 0rem 0.9375rem;
    }*/
    .gradesDetail>.scoreClass>div{
      display: -webkit-box;
    	display: -moz-box;
    	display: -ms-box;
    	display: box;;
    }
    .gradesDetail>.scoreClass>div>div{
      -webkit-box-flex:1;
      -moz-box-flex:1;
      -ms-box-flex:1;
      box-flex:1;
      text-align: center;
      margin-top: 0.9725rem;
    }
    .gradesDetail>.scoreClass>div>div>p{
      margin: 0rem;
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
    }
    /*.gradesDetail>.suppliers{
      height: 2.75rem;
      padding: 0rem 0.9725rem;
    }
    .gradesDetail>.suppliers>.supplier{
      display: inline-block;
      font-size: 0.9725rem;
      line-height: 2.75rem;
      color: #333;
    }
    .gradesDetail>.suppliers>.supplier>.supplierLevel{
      color: #ffb772;
    }
    .gradesDetail>.suppliers>.supplierDetail{
      font-size: 0.9725rem;
      color: #999;
      float: right;
      width: 3rem;
      line-height: 2.75rem;
    }*/
    .gradesDetail>.scoreClass>div>div>.color1{
      width:  4.3125rem;
      height: 4.3125rem;
      border-radius: 50%;
      margin: 0px auto;
      background-color: #ffb772;
      position: relative;
    }
    .gradesDetail>.scoreClass>div>div>.color2{
      width:  4.3125rem;
      height: 4.3125rem;
      border-radius: 50%;
      margin: 0px auto;
      background-color: #fe7667;
      position: relative;
    }
    .gradesDetail>.scoreClass>div>div>.color3{
      width:  4.3125rem;
      height: 4.3125rem;
      border-radius: 50%;
      margin: 0px auto;
      background-color: #98b2f3;
      position: relative;
    }
    .gradesDetail>.scoreClass>div>div>.color1>div>p{
      line-height: 3.6875rem;
      margin: 0rem;
      font-size: 0.875rem;
      color: #757575;
    }
    .gradesDetail>.scoreClass>div>div>.color2>div>div{
      font-size: 0.875rem;
      color: #757575;
      line-height: 1.3;
    }
    .gradesDetail>.scoreClass>div>div>.color2>div>div:first-child{
      margin-top: 0.8rem;
    }
    .gradesDetail>.scoreClass>div>div>.color3>div>div{
      margin: 0;
      font-size: 0.875rem;
      color: #757575;
      line-height: 1.3;
    }
    .gradesDetail>.scoreClass>div>div>.color3>div>div:first-child{
      margin-top: 0.8rem;
    }
    .gradesDetail>.scoreClass>div>div>div>div{
      width: 3.6875rem;
      height: 3.6875rem;
      border-radius: 50%;
      margin: 0.3125rem auto;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -1.84375rem;
      margin-top: -1.84375rem;
    }
    .gradesDetail>.scoreClass>div>div>div>div>p{
      color: #b3b3b3;
    }
</style>
