<template>
  <div class="barChart">
    <div class="chart"><span></span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['option'],
  watch: {
    'option.height': function (val, oldVal) {
      this.setSpanHeight(this.option.height)
    }
  },
  methods: {
    setSpanHeight: function (height) {
      this.$el.childNodes[1].firstChild.style.height = ((10 - height) * 12 + 1) + 'px'
    },
    setBg: function (bg) {
      if (bg === 'green') {
        this.$el.childNodes[1].style.backgroundImage = 'url(http://api.7caijia.cn/files/2016062713/462faa526bfe6780f4bf7cfd422332bc.png)'
      } else if (bg === 'orange') {
        this.$el.childNodes[1].style.backgroundImage = 'url(http://api.7caijia.cn/files/2016062713/3004dc0d2654ed59d5765b8dc50239dc.png)'
      }
    }
  },
  ready () {
    this.setSpanHeight(this.option.height)
    this.setBg(this.option.bg)
  }
}
</script>
<style>
.barChart{
  background-color: #fff;
}
.barChart>.chart{
  margin: auto;
  height: 120px;
  width: 45px;
  background-color: #e0ece3;
  background: url(../assets/bggreen.png);
  background-size: 45px 12px;
}
.barChart>.chart>span{
  height: 12px;
  display: block;
  background-color: #fff;
}
</style>
