<template>
  <div class="weekly"
    v-class="showLeft:showLeft"
    v-transition="leftIn">
    <leftbody show-left="{{@ showLeft}}" active="{{active}}" keep-alive></leftbody> 

    <div class="main">
      <header class="w-header">
        <a class="userheader"
          v-on="click: toggleLeft"
          v-attr="href:'#/friend/'+user.id">
          <img v-show="!showColor"
            v-attr="src:user.header "
            alt="header">
          <div class="showColor"
          v-show="showColor"
          v-text="user.name.slice(0,1)"
          v-style=" background-color: 'rgba(102,102,153,.8)',color:'#eee'">
        </div>
        </a>
        <span class="username w-username" v-text="user.name.slice(1)"></span>
       <!--  <a class="setup"
          v-on="click: comment"
          v-attr="href:'#/comment/'+user.id">
          <img src="./../../icon/chat.png" alt="">
        </a> -->
      </header>
      <div class="week-content">
        <span>{{time}}期週報</span>
        <tasks tasks="{{@tasks}}"></tasks>
      </div> 
    </div> 
    <footerinfo></footerinfo>
    <!-- <pre>{{$data|json}}</pre> -->
  </div>
</template>

<script>
  var api = require('./../api.js')
  module.exports = {
    ready: function(){
      this.weeklyDetail()
      console.log(this.user)
    },
    attached:function(){
      this.showLeft = false
    },
    repalce:true,
    data:function(){
      return {
        showLeft: false,
        active: 'Weekly',
        user:{
          // name:'念樹於心',
          // header:'./../../images/header.jpg'
        },
        time:"",
        tasks:[],
        showColor:true
      }
    },

    components:{
      leftbody: require('./leftbody.vue'),
      footerinfo: require('./footer.vue'),
      tasks: require('./tasks.vue')  
    },

    methods: {
      weeklyDetail: function(){
        var hash = window.location.hash
        console.log(hash.split('/'))
        var arr = hash.split('/')

        if(arr.length==5){
          var time = arr[2]
          var userId = arr[arr.length-1]
        }else if(arr.length==2){
          var time = 'last'
          var userId = 'me'
        }else{
          return
        }
        console.log(userId)
        console.log(time)
        api.task.weekly(time,userId,function(res){
          console.log(res.user)
          this.$set('user',res.user)
          this.$set('time',res.time)
          this.$set('tasks',res.tasks)
          // console.log(res.tasks[0].body)
        }.bind(this))
      },
      comment: function(){

      },
      toggleLeft: function(){
        this.showLeft = !this.showLeft
      }
    }
  }
</script>

<style>
  .weekly{
    position: absolute; 
    left: 0;
    width: 100%;
    height: 100%;
  }
  .showLeft{
    left: 80%;
  }
  .w-username{
    color: #666;
  }
  .w-header{
    border: none;
  }
</style>