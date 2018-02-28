<template>
  <div id="app" :class="{'android':type}">
    <activity-theme></activity-theme>
    <activity-followers></activity-followers>
    <Activity-details></Activity-details>
    <Activity-comments></Activity-comments>
  </div>
</template>

<script>
import ActivityTheme from './components/ActivityTheme'
import ActivityFollowers from './components/ActivityFollowers'
import ActivityDetails from './components/ActivityDetails'
import ActivityComments from './components/ActivityComments'
import store from './stores/appStore'

export default {
  components: {
    ActivityTheme,
    ActivityFollowers,
    ActivityDetails,
    ActivityComments
  },
  data () {
    return {
      uid: 0,
      aid: 0,
      type: false
    }
  },
  created () {
    this.pageInitStart(true)
    // 页面开始加载
  },
  methods: {
    pageInitStart (state) {
      store.updatePageInitstate(state)
    }
  },
  ready () {
    if (store.apptype === 'android') {
      this.type = true
    }
  }
}
</script>

<style>
html {
  width: 100%;
  font-size: 16px;
}
body{
  margin: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  font-size: 16px;
  -webkit-text-size-adjust: 100%!important;
  min-width:290px;
  box-shadow: #7a7a7a 1px 1px 10px;
  font-family: system,-apple-system,"Helvetica Neue","PingHei","Heiti SC",sans-serif;
}
#app {
  width:100%;
	margin: auto;
}

</style>
