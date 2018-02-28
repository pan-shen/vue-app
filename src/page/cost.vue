<template>
  <div id="app" :class="{'android':type}">
    <Cost-Detail></Cost-Detail>
  </div>
</template>

<script>
import CostDetail from '../components/CostDetail'
import store from '../vuex/store'
// import Talk from '../talk'
import Functions from '../common'
export default {
  components: {
    CostDetail
  },
  store: store,
  data () {
    return {
      type: false
    }
  },
  created () {
    // Talk.start(true)
  // 页面开始加载
  },
  methods: {

  },
  ready () {
    if (Functions.getUrlParameter('apptype') === 'android') {
      this.type = true
    }
    window.scrollTo(0, 0)
  }
}
</script>

<style>
html {
  width: 100%;
  font-size: 16px;
}
#app{
  margin: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  font-size: 16px;
  -webkit-text-size-adjust: 100%!important;
  min-width:290px;
  box-shadow: #7a7a7a 1px 1px 10px;
  font-family: system,-apple-system,"Helvetica Neue","PingHei","Heiti SC",sans-serif;
  background-color: #f1f1f1;
}
#app {
  width:100%;
	margin: auto;
  background-color: #f1f1f1;
}

</style>
