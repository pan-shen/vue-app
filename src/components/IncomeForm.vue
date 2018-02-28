<template>
  <div class="IncomeForm">
    <div class="IncomeFormText">
      <span>本月收入组成</span>
      <span>明细></span>
    </div>
    <div id="income"></div>
  </div>
  <div class="CostForm">
    <div class="CostFormText">
      <span>本月支出组成</span>
      <span>明细></span>
    </div>
    <div id="cost"></div>
  </div>
  <div class="AddIncomeCost">
    <div class="AddText">小区累计收支</div>
    <div class="AddIncome">
      <div class="progress"><span></span></div>
      <div class="AddIncomeText">收入55%</div>
    </div>
    <div class="AddCost">
      <div class="progress"><span></span></div>
      <div class="AddCostText">支出70%</div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts')
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  ready () {
    var myChart1 = echarts.init(document.getElementById('income'))
    var myChart2 = echarts.init(document.getElementById('cost'))
    myChart1.setOption({
      title: {
        text: '收入',
        x: '60',
        y: 'center',
        textStyle: {
          color: '#757575',
          fontSize: '15'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        align: 'left',
        icon: 'circle',
        data: ['住宅物业费69%', '商铺物业费19%', '地下停车服务费5%', '地下停车能耗费4%', '临时停车费1%']
      },
      color: [
        '#8fd675', '#bb8cf2', '#98b2f3', '#ffb772', '#fce53f', '#fe6965', '#c4ccd3'
      ],
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['80', '50%'],
        data: [
            {value: 335, name: '住宅物业费69%'},
            {value: 310, name: '商铺物业费19%'},
            {value: 234, name: '地下停车服务费5%'},
            {value: 135, name: '地下停车能耗费4%'},
            {value: 1548, name: '临时停车费1%'}
        ],
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
        x: '60',
        y: 'center',
        textStyle: {
          color: '#757575',
          fontSize: '15'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        align: 'left',
        icon: 'circle',
        data: ['安保服务费54%', '保洁物业费21%', '物业经理人工费5%', '工程维修服务费4%', '绿化养护费1%', '电梯维护1%']
      },
      color: [
        '#8fd675', '#bb8cf2', '#98b2f3', '#ffb772', '#fce53f', '#fe6965', '#c4ccd3'
      ],
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['80', '50%'],
        data: [
            {value: 335, name: '安保服务费54%'},
            {value: 310, name: '保洁物业费21%'},
            {value: 234, name: '物业经理人工费5%'},
            {value: 135, name: '工程维修服务费4%'},
            {value: 1548, name: '绿化养护费1%'},
            {value: 1548, name: '电梯维护1%'}
        ],
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
  },
  created () {

  }
}
</script>
<style>
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
    padding: 0rem 0rem 0.9375rem 0.9375rem;
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
