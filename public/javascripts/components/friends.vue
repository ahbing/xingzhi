<template>
  <div class="friends"
    v-class="showLeft:showLeft"
    v-transition="leftIn">
    <leftbody show-left="{{@ showLeft}}" show-color="{{@ showColor}}" active="{{active}}" keep-alive></leftbody> 

    <div class="main">
      <a class="single"
        v-repeat="friend in friends"
        v-on="click: getCalendar(friend, $event)" 
        v-attr="href:'/friend/'+friend._id">
        <img  v-show="!showColor" v-attr="src:friend.header " alt="header">
        <div class="showColor"
          v-show="showColor"
          v-text="friend.name.slice(0,1)"
          v-style=" background-color: 'rgba(102,51,' + bg + ',.8)',color:'#eee'">
        </div>
        <p v-text="friend.name.slice(1)"></p>
        <em v-text="friend.updatetime"></em>
      </a>
    </div> 
    <footerinfo></footerinfo>
  </div>
</template>

<script>
var api = require('./../api.js')
  module.exports = {
    ready: function(){
      api.user.friends(function(res){
        var friends = res.friends
        //console.log(friends)
        this.$set('friends',friends)
      }.bind(this))
    },
    attached:function(){
      this.showLeft = false
    },
    repalce:true,
    data:function(){
      return {
        showLeft: false,
        active: 'Friends',
        friends:[],
        showColor:true
      }
    },
    computed:{
      bg:function(){
        return parseInt(Math.random()*255)
      }
    },
    components:{
      leftbody: require('./leftbody.vue'),
      footerinfo: require('./footer.vue')
    },
    methods: {
      getCalendar: function(friend,e){
        e.preventDefault()
        //var page = 1
        // api.user.friend(friend._id,page,function(res){
        //   console.log(res)
        // })
        var hash = '/friend/'+friend._id
        console.log(hash)
        window.location.hash = hash
        this.showLeft = !this.showLeft
      }
    }
  }
</script>

<style>
  .friends{
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .showLeft{
    left: 80%;
  }

  .single{
    position: relative;
    display: block;
    width: 100%;
    height: 2.4rem;
    padding: .5rem 0;
  }
  .single>img{
    position: absolute;
    width:2.4rem;
    height:2.4rem;
    border-radius: 1.2rem;
  }
  .single>p{
    display: inline-block;
    width: auto;
    height: 2.4rem;
    line-height: 2.4rem;
    padding-left: 2.8rem;
    color:#666;
  }
  .single>em{
    float: right;
    line-height:3rem;
    font-size: .8rem;
    color: #ccc;
    vertical-align: bottom;
  }
</style>