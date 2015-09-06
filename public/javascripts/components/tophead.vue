<template>
  <div class="tophead">
    <span v-on="click:toggleLeft" class="i-menu">
      <img src="./../../icon/liebiao.png" alt="">
    </span>
    <span class="mouth" v-text="month|toChinese"></span>月
    <span class="i-day">
    </span>
    <span v-on="click:toggleMore" class="i-more">
      <img src="./../../icon/more.png" alt="">
      
    </span>
    <ul class="more-options"
      v-on="click:toggleMore"
      v-show="showMore" >
      <li class="more-option">
        <a v-on="click:generateWeekly" href="#/gweekly">預覽週報</a>
      </li>
      <li class="more-option">
        <a v-on="click: logout" href="#/">退出行之</a>
      </li>
      <li v-on='click: improvement' class="more-option">
        <a href="#/about">關於行之</a>
      </li>
    </ul>
  </div>
</template>

<script>
  var api = require('./../api.js')
  module.exports = {
    props:["showLeft"],
    data:function(){
      return {
        month: new Date().getMonth(),
        showMore: false
      }
    },
    filters: {
      toChinese:function(val){
        var num = ["一","二","三","四","五","六","七","八","九","十","十一","十二"]
        return num[val]
      }
    },
    methods: {
      toggleMore: function(){
        this.showMore = !this.showMore
        console.log(this.showMore)
      },
      toggleLeft: function(){
        this.showLeft = !this.showLeft
      },
      logout: function(e){
        e.preventDefault()
        api.user.logout(function(){
          window.location.hash = '/'
          this.toggleLeft()
          window.location.reload()
        }.bind(this))
      },
      generateWeekly: function(){
        window.location.hash = '/weekly'
        this.toggleLeft()
      },
      improvement: function(){
        window.location.hash = '/about'
        this.toggleLeft()
      }
    }
  }
</script>

<style>

  .tophead{
    position: relative;
    left: 0;
    top:0;
    width: 100%;
    background-color: rgba(102,102,153,.8);
    color: #fff;
    height: 2.4rem;
    line-height: 2.4rem;
  }
  .tophead span>img{
    position: relative;
    top: -.26rem;
    vertical-align: middle;
    line-height: 2.4rem;
    width: 1.2rem;
    cursor: pointer;
  }

  .i-menu{
    margin-left: 6%;
    margin-right: 1%;
  }
  .i-more{
    position: absolute;
    right: 6%;
  }
  .more-options{
    position: absolute;
    z-index: 233;
    right: 0rem;
    width:6rem;
    height: auto;
    padding: .2rem;
    background:rgba(255, 255, 255, 1);
  }
  .more-options li{
    display: block;
    width: 100%;
    height: 2rem;
    text-align: center;
  }
   .more-options>li>a{
    color:rgba(102,102,153,.8) ;
    font-weight: lighter;
   }
   .fade-transition{
    transition: all .3s ease;

   }
   .fade-enter,
   .fade-leave{
    opacity: 0;
    height: 0;
   }


</style>