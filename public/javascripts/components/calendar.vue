<template>
  <div class="calendar"
    v-class="showLeft:showLeft"
    v-transition="leftIn">
    <leftbody show-left="{{@ showLeft}}" active="{{active}}" keep-alive></leftbody> 

    <div class="main">
      <p class="user-name" v-text="name.slice(1)"></p>
      <ul class="weekly-list">
        <li v-repeat="weekly in weeklies">
          <a v-on="click:weeklyDetails"
            v-attr="href:'#/weekly/'+weekly+'/user/'+friendId">
            {{weekly}}
          </a>
        </li>
      </ul>
    </div> 
    <footerinfo></footerinfo>
  </div>
</template>

<script>
  var api = require('./../api.js')

  module.exports = {
    attached: function(){
      this.getweeklies()
      this.showLeft = false
      console.log('helloworld')
    },
    props: ['showLeft'],
    repalce:true,
    data:function(){
      return {
        showLeft: false,
        active: 'Calendar',
        weeklypage: 1,
        weeklies:[
        // "2015-08-01","2015-09-01","2015-10-01"
        ],
        friendId:'',
        name:''
      }
    },
    components:{
      leftbody: require('./leftbody.vue'),
      footerinfo: require('./footer.vue')
    },
    methods: {
      getweeklies: function(){
        // console.log(this.$root.currentUser)
        var currentUser = this.$root.currentUser
        var arr = window.location.hash.split('/')
        var friendId = arr[arr.length-1].length==24? arr[arr.length-1] : 'me'
        var page = this.weeklypage
        api.user.friend(friendId,page,function(res){
          //返回該朋友的週報日曆
          console.log(res)
          var weeklies = res.weeklies
          var friendId = res.friendId
          var name = res.name
          this.$set('weeklies',weeklies)
          this.$set('friendId',friendId)
          this.$set('name',name)
          this.weeklypage++
        }.bind(this))
      },
      weeklyDetails: function(){
        this.showLeft = !this.showLeft
      }
    }
  }
</script>

<style>
  .calendar{
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .showLeft{
    left: 80%;
  }
  .user-name{
    font-size: 1.2rem;
    letter-spacing: .4rem;
  }
  .weekly-list{
    width: 90%;
    height: auto;
    padding: 5%;
  }

  .weekly-list>li>a{
    color: #000;
  }
  .weekly-list>li>a:hover,
  .weekly-list>li>a:link,
  .weekly-list>li>a:active{
    color: rgba(102,102,153,1);
  }


</style>