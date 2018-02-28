<template>
  <div class="IncomeCost">
    <div class="monthBill">本月账户情况</div>
    <div class="bar">
      <div class="chart">
        <Bar-Chart :option='option1'></Bar-Chart>
        <div class="barText">收入</div>
        <div class="barNum">{{thisIncome}}</div>
      </div>
      <div class="chart">
        <Bar-Chart :option='option2'></Bar-Chart>
        <div class="barText">支出</div>
        <div class="barNum">{{thisCost}}</div>
      </div>
    </div>
  </div>
  <div class="IncomeForm">
    <div class="IncomeFormText">
      <span>本月收入组成</span>
      <span><a v-link="{ path: '/income', query: { zone_id: zone_id, month: month, year: year  , apptype: apptype} }">明细></a></span>
    </div>
    <div id="income"></div>
  </div>
  <div class="CostForm">
    <div class="CostFormText">
      <span>本月支出组成</span>
      <span><a v-link="{ path: '/cost', query: { zone_id: zone_id, month: month, year: year  , apptype: apptype} }">明细></a></span>
    </div>
    <div id="cost"></div>
  </div>
  <div class="AddIncomeCost">
    <div class="AddText">物业费收支进度<span>({{timePeriod}})</span></div>
    <div class="AddIncome">
      <div class="progress"><span id="incomeProgress"></span></div>
      <div class="AddIncomeText">收入{{incomePercent}}</div>
    </div>
    <div class="AddCost">
      <div class="progress"><span id="costProgress"></span></div>
      <div class="AddCostText">支出{{costPercent}}</div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts')
import BarChart from './BarChart'
import Functions from '../common'
import Data from '../data/data'
import { setMonthAndYear } from '../vuex/actions'
import { getMonth, getYear, getEid } from '../vuex/getters'
export default {
  components: {
    BarChart
  },
  data () {
    return {
      apptype: Functions.getUrlParameter('apptype'),
      zone_id: Functions.getUrlParameter('zone_id'),
      option1: {'height': 1, 'bg': 'green'},
      option2: {'height': 3, 'bg': 'orange'},
      thisIncome: 1234.5,
      thisCost: 65432.3,
      balance: 986545,
      nextCost: 182738217,
      note: '',
      incomeLegendData: ['住宅物业费69%', '商铺物业费19%', '地下停车服务费5%', '地下停车能耗费4%', '临时停车费1%'],
      costLegendData: ['安保服务费54%', '保洁物业费21%', '物业经理人工费5%', '工程维修服务费4%', '绿化养护费1%', '电梯维护1%'],
      incomeSeriesData: [
          {value: 335, name: '住宅物业费69%'},
          {value: 310, name: '商铺物业费19%'},
          {value: 234, name: '地下停车服务费5%'},
          {value: 135, name: '地下停车能耗费4%'},
          {value: 1548, name: '临时停车费1%'}
      ],
      costSeriesData: [
          {value: 335, name: '安保服务费54%'},
          {value: 310, name: '保洁物业费21%'},
          {value: 234, name: '物业经理人工费5%'},
          {value: 135, name: '工程维修服务费4%'},
          {value: 1548, name: '绿化养护费1%'},
          {value: 1548, name: '电梯维护1%'}
      ],
      incomePercent: '55%',
      costPercent: '70%',
      timePeriod: '2016-101-1-1'
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
      this.getData()
    }
  },
  methods: {
    getData () {
      var yearMonth = this.year + this.month
      this.all = Data.IncomeAndCost[this.zone_id][yearMonth]
      this.changeData(this.all.option1Height, this.all.option2Height, this.all.thisIncome,
        this.all.thisCost, this.all.balance, this.all.nextCost, this.all.incomeLegendData, this.all.costLegendData, this.all.incomeSeriesData, this.all.costSeriesData, this.all.incomePercent, this.all.costPercent, this.all.timePeriod, this.all.note)
    },
    changeData (option1Height, option2Height, thisIncome, thisCost, balance, nextCost, incomeLegendData, costLegendData, incomeSeriesData, costSeriesData, incomePercent, costPercent, timePeriod, note) {
      this.option1.height = option1Height
      this.option2.height = option2Height
      this.thisIncome = thisIncome
      this.thisCost = thisCost
      this.balance = balance
      this.nextCost = nextCost
      this.incomeLegendData = incomeLegendData
      this.costLegendData = costLegendData
      this.incomeSeriesData = incomeSeriesData
      this.costSeriesData = costSeriesData
      this.incomePercent = incomePercent
      this.costPercent = costPercent
      this.timePeriod = timePeriod
      this.note = note
      this.refreshData()
      document.getElementById('incomeProgress').style.width = incomePercent
      document.getElementById('costProgress').style.width = costPercent
    },
    refreshData () {
      var myChart1 = echarts.init(document.getElementById('income'))
      var myChart2 = echarts.init(document.getElementById('cost'))
      myChart1.setOption({
        title: {
          text: '收入',
          x: '80',
          y: 'center',
          textStyle: {
            color: '#757575',
            fontSize: '15'
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 'middle',
          align: 'left',
          icon: 'circle',
          data: this.incomeLegendData
        },
        color: [
          '#8fd675', '#bb8cf2', '#98b2f3', '#ffb772', '#fce53f', '#fe6965', '#c4ccd3'
        ],
        series: [{
          name: '',
          type: 'pie',
          radius: ['25%', '65%'],
          center: ['100', '50%'],
          data: this.incomeSeriesData,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
      myChart2.setOption({
        title: {
          text: '支出',
          x: '80',
          y: 'center',
          textStyle: {
            color: '#757575',
            fontSize: '15'
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 'middle',
          align: 'left',
          icon: 'circle',
          data: this.costLegendData
        },
        color: [
          '#8fd675', '#bb8cf2', '#98b2f3', '#ffb772', '#fce53f', '#fe6965', '#c4ccd3'
        ],
        series: [{
          name: '',
          type: 'pie',
          radius: ['25%', '65%'],
          center: ['100', '50%'],
          data: this.costSeriesData,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  },
  ready () {
    this.getData()
    this.refreshData()
  }
}
</script>
<style>
  .IncomeCost{
    background-color: #fff;
    margin-bottom: 0.9375rem;
  }
  .IncomeCost>.monthBill{
    padding: 0.9375rem 0rem 0rem 0.9375rem;
    font-size: 0.875rem;
    color: #333;
  }
  .IncomeCost>.bar{
    overflow: hidden;
    width: 12rem;
    margin: auto;
  }
  .IncomeCost>.bar>.chart{
    overflow: hidden;
    width: 6rem;
    float: left;
  }
  .IncomeCost>.bar>.chart>.barText{
    text-align: center;
    color: #757575;
    font-size: 0.9375rem;
    margin: 0.5rem 0rem 0rem 0rem;
  }
  .IncomeCost>.bar>.chart>.barNum{
    text-align: center;
    color: #333;
    font-size: 0.9375rem;
    margin: 0.1rem 0rem 0rem 0rem;
  }
  .IncomeCost>.billTable{
    margin: 1.5625rem 0.9375rem 0rem 0.9375rem;
    padding-bottom: 0.9375rem;
  }
  .IncomeCost>.billTable>.note{
    padding-top: 0.625rem;
    color: #333;
  }
  .IncomeCost>.billTable>table{
    width: 100%;
    border: 1px solid #acacac;
    border-collapse: collapse;
  }
  /*.android .IncomeCost>.billTable>table{
    border: 1px solid #acacac !important;
  }*/
  .IncomeCost>.billTable>table>tbody>tr>td{
    border: 1px solid #acacac;
    text-align: center;
    height: 2.5rem;
    color: #333333;
    font-size: 0.9375rem;
    width: 50%;
  }
  /*.android .IncomeCost>.billTable>table>tbody>tr>td{
    border: 1px solid #acacac !important;
  }*/
  .IncomeCost>.billTable>table>tbody>tr>.billTableText{
    font-size: 0.875rem;
  }
  .IncomeForm{
    background-color: #fff;
    margin-bottom: 0.9375rem;
  }
  .IncomeForm>.IncomeFormText{
    margin-left: 0.9375rem;
    font-size: 0.9375rem;
    overflow: hidden;
    line-height: 2.8125rem;
    color: #333;
    border-bottom: 1px solid #e1e1e1;
  }
  /*.android .IncomeForm>.IncomeFormText{
    border-bottom: 1px solid #e1e1e1 !important;
  }*/
  .IncomeForm>.IncomeFormText>span>a{
    color: #999;
    text-decoration: none;
  }
  .IncomeForm>.IncomeFormText>span:last-child{
    float: right;
    margin-right: 0.9375rem;
    color: #999;
  }
  .IncomeForm>#income{
    height: 12.8125rem;
  }
  .CostForm{
    background-color: #fff;
    margin-bottom: 0.9375rem;
  }
  .CostForm>.CostFormText{
    margin-left: 0.9375rem;
    font-size: 0.9375rem;
    overflow: hidden;
    line-height: 2.8125rem;
    color: #333;
    border-bottom: 1px solid #e1e1e1;
  }
  /*.android .CostForm>.CostFormText{
    border-bottom: 1px solid #e1e1e1 !important;
  }*/
  .CostForm>.CostFormText>span>a{
    color: #999;
    text-decoration: none;
  }
  .CostForm>.CostFormText>span:last-child{
    float: right;
    margin-right: 0.9375rem;
    color: #999;
  }
  .CostForm>#cost{
    height: 12.8125rem;
  }
  .AddIncomeCost{
    background-color: #fff;
    overflow: hidden;
  }
  .AddIncomeCost>.AddText{
    padding: 0.9375rem 0rem 1.25rem 0.9375rem;
    font-size: 0.9375rem;
    color: #333;
  }
  .AddIncomeCost>.AddText>span{
    font-size: 0.7rem;
  }
  .AddIncomeCost>.AddIncome{
    width: 100%;
    position: relative;
    z-index: 0;
    display: -moz-box;
    display: -webkit-box;
    display: box;
    margin: 0rem 0rem 0.9375rem 0.9375rem;
  }
  .AddIncomeCost>.AddIncome>.progress{
    overflow: hidden;
    width: 200px;
    height: 1.09375rem;
    font-size: 0;
    background-color: #f1f1f1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .AddIncomeCost>.AddIncome>.progress>span{
    display: block;
    width: 55%;
    background: #8fd675;
    height: 100%;
    font-size: 0;
    border-radius: 2px;
  }
  .AddIncomeCost>.AddIncome>.AddIncomeText{
    color: #757575;
    font-size: 0.8125rem;
    margin-left: 0.625rem;
  }

  .AddIncomeCost>.AddCost{
    width: 100%;
    position: relative;
    z-index: 0;
    display: -moz-box;
    display: -webkit-box;
    display: box;
    padding: 0rem 0rem 1.9375rem 0.9375rem;
  }
  .AddIncomeCost>.AddCost>.progress{
    overflow: hidden;
    width: 200px;
    height: 1.09375rem;
    font-size: 0;
    background-color: #e2e2e2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .AddIncomeCost>.AddCost>.progress>span{
    display: block;
    width: 70%;
    background: #ffb772;
    height: 100%;
    font-size: 0;
    border-radius: 2px;
  }
  .AddIncomeCost>.AddCost>.AddCostText{
    color: #757575;
    font-size: 0.8125rem;
    margin-left: 0.625rem;
  }
</style>
