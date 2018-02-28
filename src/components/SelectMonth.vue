<template>
  <div class="gradesMonth">
    <div class="date">
      <span class="month">{{month}}</span>
      <span>月/</span>
      <span class="year">{{year}}</span>
    </div>
    <div class="calendar" id="calendar" v-on:click="show">
      <img src='../assets/calendar.png'/>
    </div>
    <div class="dates" id="dates" v-on:click="hide">
      <div class="icon"></div>
      <div class="time" id="time">
        <div v-for="value in datas" v-on:click="getData(value)"
        v-bind:class="month === value.substring(5, 7) ? 'back' : ''">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import Data from '../data/data'
import Functions from '../common'
import { setMonthAndYear } from '../vuex/actions'
import { getMonth, getYear } from '../vuex/getters'
export default {
  data () {
    return {
      datas: [],
      zone_id: Functions.getUrlParameter('zone_id')
    }
  },
  vuex: {
    actions: {
      setMonthAndYear
    },
    getters: {
      month: getMonth,
      year: getYear
    }
  },
  methods: {
    getData (data) {
      var year = data.substring(0, 4)
      var month = data.substring(5, 7)
      this.setMonthAndYear(month, year)
      this.hide()
    },
    hide () {
      var dates = document.getElementById('dates')
      dates.style.opacity = '0'
      dates.style.position = ''
      dates.style.zIndex = '1'
      dates.style.right = ''
      dates.style.left = ''
      dates.style.top = ''
      dates.style.bottom = ''
    },
    show () {
      var dates = document.getElementById('dates')
      dates.style.position = 'fixed'
      dates.style.zIndex = '4'
      dates.style.opacity = '1'
      dates.style.right = '0'
      dates.style.left = '0'
      dates.style.top = '0'
      dates.style.bottom = '0'
      window.scrollTo(100, 0)
    }
  },
  ready () {
    // for (var i = 0; i < 5; i++) {
    // this.datas.push(moment().subtract(1, 'month').format('YYYY年MM月'))
    // }
    var arr = Object.keys(Data.IncomeAndCost[this.zone_id])
    // if (Data.month.length !== 0) {
    //   this.datas = Data.month
    // } else {
    //   this.datas.push(moment('201606', 'YYYYMM').format('YYYY年MM月'))
    // }
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].substring(0, 4) + '年' + arr[i].substring(4, 6) + '月'
    }
    this.datas = arr.reverse()
    // this.datas.push(moment('201606', 'YYYYMM').format('YYYY年MM月'))
    this.getData(this.datas[0])
  }
}
</script>
<style>
    .gradesMonth{
        background-color: #f1f1f1;
        height: 3.75rem;
        border-bottom: 0.5px solid #e0e0e0;
    }
    .android .gradesMonth{
        border-bottom: 1px solid #e0e0e0 !important;
    }
    .gradesMonth>.date{
      display: inline-block;
      width: 8rem;
      height: 3.75rem;
      line-height: 3.75rem;
      margin-left: 0.9375rem;
    }
    .gradesMonth>.date>.month{
      font-size: 1.5625rem;
      color: #333333;
    }
    .gradesMonth>.date>span{
      font-size: 0.9375rem;
      color: #999999;
    }
    .gradesMonth>.calendar{
      display: inline-block;
      width: 1.25rem;
      float: right;
      height: 3.75rem;
      /*line-height: 3.75rem;*/
      margin-right: 1.25rem;
    }
    .gradesMonth>.calendar>img{
      width: 1.125rem;
      margin-top: 1.375rem;
    }
    .gradesMonth>.dates{
      /*display: none;*/
      /*opacity: 0;*/
      position: absolute;
      /*width: 7.75rem;*/
      border-radius: 0.25rem;
      -moz-border-radius: 0.25rem;
      -webkit-border-radius: 0.25rem;
      /*top: 0;
      bottom: 0;
      left: 0;
      right: 0;*/
      z-index: 2;
    }
    .gradesMonth>.dates>.time{
      background-color: #d0f2ff;
      width: 7.75rem;
      /*height: 12.5rem;*/
      color: #333;
      font-size: 0.875rem;
      line-height: 2.5rem;
      text-align: center;
      border-radius: 0.25rem;
      overflow: hidden;
      position: absolute;
      right: 9px;
      top: 46px;
    }
    .gradesMonth>.dates>.time>div:hover{
      background-color: #11bdff;
      color: #fff;
    }
    .gradesMonth>.dates>.time>.back{
      background-color: #11bdff;
      color: #fff;
    }
    .gradesMonth>.dates>.icon{
      position: absolute;
      top: 35px;
      right: 24px;
      border: 6px solid #d0f2ff;
      border-left-color: rgba(255, 255, 255, 0);
      border-right-color: rgba(255, 255, 255, 0);
      border-top-color: rgba(255, 255, 255, 0);
    }

</style>
