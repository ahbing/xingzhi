<template>
  <div class="weekly"
    v-class="showLeft:showLeft"
    v-transition="leftIn">
    <leftbody show-left="{{@ showLeft}}" active="{{active}}" keep-alive></leftbody> 

    <div class="main">
      <p v-show="hasPublished"
        class="error"
        v-transition='fade'>
        該期週報已經提交過，無法重複提交
      </p>
      <div class="week-content">
        <span>{{time}}期週報預覽</span>
        <tasks tasks="{{@tasks}}"></tasks>
      </div>
      <div v-if="hasPublish" v-show="isSunday" class="publish">
        <a href="#/publish"
          v-on="click:publishWeekly">
          一鍵提交
        </a>
      </div>
    </div>
    <footerinfo></footerinfo>
    <!-- <pre>{{$data|json}}</pre> -->
  </div>
</template>

<script>
  var api = require('./../api.js')
  module.exports = {
    attached: function(){
      this.preWeekly()
      this.showLeft = false
      //console.log(this.publishtime)
    },
    repalce:true,
    data:function(){
      return {
        showLeft: false,
        active: 'Weekly',
        time:"",
        tasks:[],
        hasPublished:false
      }
    },
    computed:{
      isSunday: function(){
        var day = new Date().getDay()
        //週日顯示 一鍵提交按鈕
        // return day === 6
        return day == 0
      },
      hasPublish: function(){
        return !!this.tasks.length
      }
    },
    components:{
      leftbody: require('./leftbody.vue'),
      footerinfo: require('./footer.vue'),
      tasks: require('./tasks.vue')  
    },

    methods: {
      toggleLeft: function(){
        this.showLeft = !this.showLeft
      },
      preWeekly: function(){
        api.task.preWeekly(function(res){ 
          //console.log(res)         
          var weekly = res.weekly
          if(weekly && !weekly.length) return
          this.$set('time',weekly[weekly.length-1].time)
          var tasks = []
          weekly.forEach(function(value,index,arr){
            //console.log(value.tasks)
            tasks = tasks.concat(value.tasks)
          })
          
          this.$set('tasks',tasks)
        }.bind(this))
      },
      publishWeekly: function(e){
        e.preventDefault()
        var date = new Date()
        var time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        api.task.publish(time,function(res){
          // this.$set('time','最新')
          // this.$set('tasks',[])
          if(res && res.hasPublished){
            //重複提交的提示
            this.$set('hasPublished',res.hasPublished)
              setTimeout(function(){
                this.hasPublished = false
                window.location.hash = '/person'
              }.bind(this),2000)
          }
        }.bind(this))
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
  .publish{
    margin-top: 2rem;
    position: absolute;
    right: 4%;
    top: .8rem;
    margin:auto;
    width: 6rem;
    height: 2rem;
    background: rgba(102,102,153,1);
    line-height: 2rem;
    text-align: center;
  }
   .publish>a{
    color: #eee;
   }
</style>