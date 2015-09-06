<template>
  <div class="welcome-bg">
    <a v-on="click:checkLogin" class='xing-btn' href="#">
      行之
    </a>
    <a target="_blank" class='zhi-btn' href="http://huangbingbing.com">
      知之
    </a>
    <footerinfo class="w-footer"></footerinfo>
  </div>
</template>
<script>
  var api = require('./../api.js')
  module.exports = {
    replace: true,
    methods: {
      checkLogin: function(e){
        e.preventDefault()
        api.user.checkuser(function(res){
          if(res && res.email){
            //console.log(window.location)
            //console.log(res)
            window.location.hash = '/person'
            //this.$root.view = 'person'
          }else{
            // this.$root.view = 'login'
            window.location.hash = '/login' 
          }
        }.bind(this))
      }
    },
    components:{
      footerinfo: require('./footer.vue')
    }
  }
</script>
<style>
  .welcome-bg{
    width:100%;
    height: 100%;

    background: url(./../../images/bg.jpg)
    no-repeat center center;
    background-color: rgba(102,102,153,.5);

    -moz-background-size: cover;
    -ms-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .xing-btn,
  .zhi-btn{
    display: block;
    width: 8rem;
    height: 2.4rem;
    line-height: 2.4rem;
    position: fixed;
    top: 0;
    bottom: -70%;
    margin:auto;
    color: #fff;
    font-size: 1.1rem;
    border: none;
    text-align: center;
    border-radius: 4px;
    letter-spacing: .1rem;
  }
  .xing-btn{
    left: 10%;
    background-color: rgba(102,102,153, 0.6);

  }
  .zhi-btn{
    right: 10%;
    color: rgba(102,102,153, 0.8);
    background: rgba(255, 255, 255, 0.6);
  }
  .w-footer{
    position: absolute;
    bottom: 0;
  }
</style>