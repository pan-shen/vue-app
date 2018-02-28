<template>
  <div id="app" :class="{'android':type}">
    <html5></html5>
    <htmlcomment></htmlcomment>
  </div>
</template>

<script>
import html5 from './components/Html5'
import htmlcomment from './components/HtmlComment'
import store from './stores/appStore'
export default {
  components: {
    html5,
    htmlcomment
  },
  data () {
    return {

    }
  },
  created () {
    store.start(true)
  },
  methods: {
    isComment () {
      store.isComment()
      return true
    }
  },
  ready () {
    window.isCommentArea = this.isComment
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
  /*box-shadow: #7a7a7a 1px 1px 10px;*/
  font-family: system,-apple-system,"Helvetica Neue","PingHei","Heiti SC",sans-serif;
  /*background-color: #f1f1f1;*/
}
#app {
  width:100%;
	margin: auto;
  /*background-color: #f1f1f1;*/
}

</style>
