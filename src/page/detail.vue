<template>
  <div id="app" :class="{'android':type}">
   <img v-if="isAndroid" :src="imageSrc" v-show="imageSrc" @click="sue" />
   <img v-if="isiOS" id="pic" :src="imageSrc" v-show="imageSrc" @click="testClick" />
   <pre>{{text}}</pre>
  </div>
</template>

<script>
import store from '../vuex/store'
// import Functions from '../common'
import { getImgName } from '../vuex/getters'
export default {
  store: store,
  data () {
    return {
      type: false,
      imageSrc: '',
      text: '',
      isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
      isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    }
  },
  created () {
  },
  vuex: {
    getters: {
      name: getImgName
    }
  },
  watch: {
    'name': function () {
      if (this.name.substring(0, 4) === 'http') {
        this.imageSrc = this.name
        this.text = ''
      } else {
        this.imageSrc = ''
        this.text = this.name
      }
      // if (document.readyState === 'complete') {
      //   window.scrollTo(0, 0)
      // }
    }
  },
  methods: {
    sue () {
      window.android.callBackNative('OpenImg', this.imageSrc)
    },
    testClick () {
      var str = document.getElementById('pic').src
      window.location.href = 'objc://' + ':/' + str
    }
  },
  ready () {
    if (this.name.substring(0, 4) === 'http') {
      this.imageSrc = this.name
      this.text = ''
    } else {
      this.imageSrc = ''
      this.text = this.name
    }
    // if (document.readyState === 'complete') {
    //   window.scrollTo(0, 0)
    // }
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
  min-height: 100%;
  /*background-color: #f1f1f1;*/
}
#app>img{
  display: block;
  width: 100%;
}
#app>pre{
  margin: 0;
  padding: 0.9375rem;
  color: #333;
  font-size: 0.9375rem;
  line-height: 1.5;
  white-space: pre-wrap;
  font-family: system,-apple-system,"Helvetica Neue","PingHei","Heiti SC",sans-serif;
}
</style>
