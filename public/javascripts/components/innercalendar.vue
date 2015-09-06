<template>
  <p v-text="name"></p>
  <ul>
    <li v-repeat="weekly in weeklies">
      <a v-on="click:weeklyDetails"
        v-attr="href:'#/weekly/'+weekly.time+'/userId/'+friendId">
        {{weekly}}
      </a>
    </li>
  </ul>

</template>

<script>
  var api = require('./../api.js')
  module.exports = {
    ready: function(){
      this.getweeklies()
    },
    props: ['showLeft'],
    data: function(){
      return {
        showLeft: false,
        weeklypage: 1,
        weeklies:[
          // {time:"2015-08-01"},
          // {time:"2015-09-01"},
          // {time:"2015-10-01"}
        ],
        friendId:'',
        name:''
      }
    },
    methods: {
      getweeklies: function(){
        var arr = window.location.hash.split('/')
        var friendId = arr[arr.length-1]
        var page = this.weeklypage
        api.user.friend(friendId,page,function(res){
          //返回該朋友的週報日曆
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