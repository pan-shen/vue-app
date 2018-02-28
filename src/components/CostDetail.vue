<template>
  <div class="incomeCostDetail">
    <div class="detailText">本月支出</div>
    <div class="detailNum">
      <div v-for="data in data" v-on:click="goImg(data, $event)"><span>{{data.name}}</span><span class="num">{{data.value}}</span><i>{{data.more}}</i></div>
    </div>
    <div class="detailText">累计支出</div>
    <div class="detailNum">
      <div v-for="data in addData"><span>{{data.name}}</span><span class="num">{{data.value}}</span></div>
    </div>
  </div>
</template>

<script>
import Functions from '../common'
import Data from '../data/data'
import { setMonthAndYear, setImgName } from '../vuex/actions'
import { getMonth, getYear, getEid, getImgName } from '../vuex/getters'
export default {
  components: {

  },
  data () {
    return {
      zone_id: Functions.getUrlParameter('zone_id'),
      data: [],
      addData: []
    }
  },
  vuex: {
    actions: {
      setMonthAndYear,
      setImgName
    },
    getters: {
      month: getMonth,
      year: getYear,
      eid: getEid,
      name: getImgName
    }
  },
  watch: {
    'month': function () {
      var yearMonth = this.year + this.month
      this.allData = Data.IncomeAndCost[this.zone_id][yearMonth]
      this.changeCostData()
    }
    // 'name': function () {
    //   console.log(this.name)
    // }
  },
  methods: {
    goImg (url, i) {
      if (url.more) {
        this.setImgName(url.img)
        this.$route.router.go({path: '/detail'})
      }
    },
    changeCostData () {
      this.data = this.allData.costData
      this.addData = this.allData.costSeriesAddData
    }
  },
  ready () {
    var yearMonth = this.year + this.month
    this.allData = Data.IncomeAndCost[this.zone_id][yearMonth]
    this.changeCostData()
  }
}
</script>
<style>
  .incomeCostDetail>.detailText{
    height: 1.875rem;
    padding-left: 0.9375rem;
    line-height: 1.875rem;
    font-size: 0.9375rem;
    color: #999;
  }
  .incomeCostDetail>.detailNum{
    padding-left: 0.9375rem;
    background-color: #fff;
  }
  .incomeCostDetail>.detailNum>div{
    height: 2.75rem;
    line-height: 2.75rem;
    border-bottom: 1px solid #e0e0e0;
    display:-moz-box;
    display:-webkit-box;
    display:box;
  }
  /*.android .incomeCostDetail>.detailNum>div{
    border-bottom: 1px solid #e0e0e0 !important;
  }*/
  .android .incomeCostDetail>.detailNum>div:last-child{
    border-bottom: 0px solid #e0e0e0 !important;
  }
  .incomeCostDetail>.detailNum>div:last-child{
    border-bottom: 0px solid #e0e0e0;
  }
  .incomeCostDetail>.detailNum>div>span{
    display: block;
    width: 47%;
    font-size: 0.8rem;
    color: #333;
    white-space: nowrap;
    /*text-overflow:ellipsis;*/
    /*overflow: hidden;*/
  }
  .incomeCostDetail>.detailNum>div>.num{
    text-align: center;
  }
  .incomeCostDetail>.detailNum>div>i{
    display: block;
    width: 20px;
    font-size: 0.9375rem;
    color: #333;
  }
</style>
