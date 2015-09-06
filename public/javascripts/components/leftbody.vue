<template>
  <div class="leftbody"
    v-class="showLeftbody:showLeft"
    v-transition="leftIn">
    <div class="main-menu">
      <header>
        <a v-on="click:toggleLeft" class="userheader" href="#/person">
          <img v-show="!showColor" v-attr="src: user.header" alt="header">
          <div v-show="showColor" class="showColor">
            {{headerText}}
          </div>
        </a>
        <span class="username" v-text="user.name"></span>
        <a v-on="click:toggleLeft" class="setup" href="#/setup">
          <img src="./../../icon/set.png" alt="">
        </a>
      </header>
      <nav>
        <a class="menu-item"
          v-repeat="nav in navs"
          v-class="active:nav.title==active"
          v-attr="href:nav.href"
          v-on="click:toggleLeft">
          <img v-attr="src:nav.src" alt="">
          <span v-text="nav.title"></span>
        </a>
      </nav>
    </div>
  </div>
  <div class="shadow"
    v-class="showShadow:showLeft"
    v-transition="leftIn"
    v-on="click:toggleLeft"></div>
  <tophead show-left="{{@ showLeft}}"></tophead>
</template>

<script>
  module.exports = {
    ready:function(){
      this.getUserInfo()
    },
    props:["showLeft","active","showColor"],
    repalce: true,
    data: function(){
      return {
        showLeft: false,
        user:{
          name:'行之',
          header:'./../../images/header.jpg'
        },
        navs:[
          {href:'#/friends',src:"./../../icon/friends.png",title:'Friends'},
          {href:'#/calendar',src:"./../../icon/calendar.png",title:'Calendar'},
          {href:'#/weekly',src:"./../../icon/myWeekly.png",title:'Weekly'}
        ],
        showColor:true,
        headerText :''
      }
    },
    components: {
      tophead: require("./tophead.vue")
    },
    methods:{
      toggleLeft: function(){
        this.showLeft = !this.showLeft
      },
      getUserInfo: function(){
        var user = JSON.parse(localStorage.getItem('beta'))
        //console.log(user)
        user = user ? user : this.user
        this.headerText = user.name.slice(0,1)
        this.user = {
          name: user.name.slice(1),
          header:user.header
        }
      }
    }
  }

</script>

<style>
  
  .leftbody{
    position: fixed;
    left: -800%;
    width: 80%;
    height: 100%;
    background: rgba(31,35,54,1);
  }
  .showLeftbody{
    left: 0;
  }
  .leftIn-transition{
    transition: all .4s ease;
  }
  .leftIn-enter,
  .leftIn-leave{
    left: -80%;
  }
  .shadow{
    position: fixed;
    left: -20%;
    width: 20%;
    height: 100%;
    background: transparent;
    z-index: 2222;
  }
  .showShadow{
    left: 80%;
  }
  header{
    position: relative;
    width: 88%;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    padding:0 6%;
    border-bottom:1px solid rgba(102,102,153,.8);
  }
  header>a,
  .username{
    position: absolute;
    display: inline-block;
    height:100%;
    top: 0;
  }
  .userheader{
    /*left: 6%;*/
    width: 2rem;
  }
  .username{
    left: 4.2rem;
    width: 60%;
    letter-spacing: .4rem;
  }
  .setup{
    width: 1rem;
    right: 6%;
  }
  header>a>img{
    position: absolute;
    left: 0;top: 0;bottom: 0;right: 0;
    margin:auto;
  }
  .userheader>img{
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }

  .setup>img{
    width: 1.2rem;
    height: 1.2rem;
  }
  .menu-item{
    position: relative;
    display: block;
    width: 92%;
    height: 1.4rem;
    padding: .6rem 4%;
  }
  .active{
    background: rgba(102,102,153,.8);
  }
  .menu-item>img,
  .showColor{
    position: absolute;
    top: 0;bottom: 0;
    margin:auto;
    width: 1.2rem;
  }
  .menu-item>span{
    position: absolute;
    left:16%;
    color: #fff;
    letter-spacing: .06rem;
  }

  .showColor{
    width: 1.6rem;
    height: 1.6rem;
    background: #fff;
    text-align: center;
    line-height: 1.6rem;
    color: #000;
  }

</style>