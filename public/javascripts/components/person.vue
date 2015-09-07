<template>


<div class="person"
 v-class="showLeft:showLeft"
 v-transition="leftIn">
   <p v-if="updateSuccess==false" v-transition="fade" class="error">
    添加失敗！請刷新，重新添加。或者把問題報告給我。
  </p>
  <p v-if="showerror" class='error' v-transition="fade">本週你已經提交了週報，不能更新本週數據了</p>
  <leftbody
    show-left="{{@ showLeft}}"
    keep-alive>
  </leftbody>
  <div class="aWeek">
    <div v-repeat="day in days" class="oneDay" v-class="on:day.on" v-on="click: dayDetial(day)">
      <div v-text="day.week"></div>
      <div v-text="day.date"></div>
    </div>
  </div>
  <div class="sunday-remind"
    v-show="toRemind"
    v-transition="bounce">
    今天周日了噢
    <a class="close-remind" href="#"
      v-on="click:closeRemind">知道了</a>
  </div>
  <div class="main">
    <div class="cxl-box" v-show="!tasks.length">
      <p class="cxl"
        v-repeat="p in cxl" 
        v-text="p">
      </p>
    </div>
    <div v-show="remaining.length" class="tasks">
      <h3>incompleted (<span v-text="remaining.length"></span>)</h3>
      <p v-text="newTask"></p>
      <ol>
        <li class="task" v-repeat="task in remaining">
          <input type="checkbox" v-on="click:toggleCheckd(task)">
          <span v-text="task.body"
            v-on="dblclick:editTask(task)"
            v-touch="doubletap:editTask(task)"></span> 
        </li>
      </ol>
    </div>
    <div v-show="completions.length" class="tasks">
      <h3>completed (<span v-text="completions.length"></span>)</h3>
      <ol>
        <li class="task" v-repeat="task in completions">
          <input type="checkbox" v-on="click:toggleCheckd(task)" checked="checked">
          <span v-text="task.body"></span> 
        </li>
      </ol>
    </div>
    <textarea name="newTask" rows="4"
      v-if="showTextarea"
      v-class="showTextarea:showTextarea" 
      v-transition="showTextarea" 
      v-el="newTask"
      v-model="newTask"></textarea>

    <span v-show="!showTextarea" 
      v-on="click:toggleTextarea" 
      v-transition="bounce"  
      v-class="addTaskBtn:!showTextarea">
      <img v-show="!showTextarea" src="./../../icon/add.png" alt="add">
    </span>
    <span v-show="showTextarea" 
      v-on="click:addNewTask" 
      v-transition="bounce"  
      v-class="saveTaskBtn:showTextarea">
      <img v-show="showTextarea" src="./../../icon/save.png" alt="save">
    </span>

    <span v-show="showTextarea" 
      v-on="click:cancelNewTask"
      v-transition="bounce"  
      v-class="cancelTaskBtn:showTextarea">
      <img v-show="showTextarea" src="./../../icon/cancel.png" alt="cancel">
    </span>
  </div>
  <footerinfo></footerinfo>
  <!-- <pre>{{$data | json}}</pre> -->
</div>
</template>
<script>
  var api = require('./../api.js')
  module.exports = {
    attached:function(){
      var date = new Date()
      var year = date.getFullYear()
      var month = (date.getMonth()+1)
      var day = date.getDate()
      var time = year+'-'+month+'-'+day
      this.getTasks(time)
      this.showLeft = false
    },
    data: function(){
      var num = Date.now()
      var daySecond = 24*60*60*1000
      var secondArr = []
      var weekdays = "周日,周一,周二,周三,周四,周五,周六".split(",")
      var dd = new Date(num)
      var week = dd.getDay()
      week = week == 0 ? 7 : week
      var newDays = []
      for(var i = -(week-1); i < 7-(week-1);i++){
        (function(i){
          secondArr.push(num+daySecond*i)
        })(i)
      }
      for(var j = 0, len = secondArr.length;j<len;j++){
        (function(j){
          var dd = new Date(secondArr[j])
          var year = dd.getFullYear()
          var month = (dd.getMonth()+1)
          var day = dd.getDate()
          //生成 time url
          var time = year+'-'+month+'-'+day
          var week = weekdays[dd.getDay()]
          var date = dd.getDate()
          var newObj = {week:week,date:date,time:time,on:false}
          if(num === secondArr[j]){
            newObj.on = true
          }
          newDays.push(newObj)
        })(j)
      }
      
      return {
        days: newDays,
        showTextarea: false,
        newTask: '',
        showLeft: false,
        cxl:[
          "无善无恶心之体，","有善有恶意之动，","知善知恶是良知，","为善去恶是格物。"
        ],
        time:'',
        tasks:[],
        updateSuccess:true,
        filters: {
          isProcess: function(task){
            return  ! task.completed
          },
          completed: function(task){
            return task.completed
          }
        },
        week: week,
        showerror:false
      }
    },
    computed: {
      completions: function(){
        return this.tasks.filter(this.filters.completed)
      },
      remaining: function(){
        return this.tasks.filter(this.filters.isProcess)
      },
      toRemind: function(){
        return this.week === 7
      }
    },
    components: {
      footerinfo: require("./footer.vue"),
      leftbody: require("./leftbody.vue")
    },
    methods: {
      getTasks: function(time){
        api.task.gettasks(time,function(res){
          var tasks = res.tasks
          // console.log(tasks)
          // console.log(time)
          this.$set('time',time)
          this.$set('tasks',tasks)
        }.bind(this))
      },
      dayDetial:function(day){
        this.days.forEach(function(day){
          day.on = false
        })
        day.on = true
        //  開啟一個ajax  去後臺請求數據
        this.getTasks(day.time)
      },
      toggleTextarea: function(){
        this.showTextarea = !this.showTextarea
        this.$nextTick(function(){
          if(!this.$$.newTask){
            return;
          }
          this.$$.newTask.focus()
          this.$$.newTask.placeholder = '怕什么真理无穷，进一寸有一寸的欢喜。'
        })
      },
      addNewTask: function(){
        var newTask = this.newTask
        if(!newTask){
          this.$$.newTask.placeholder = '當你提交空白，誰的節操已不在...'
          return
        }
        this.tasks.push({body:newTask,completed:false})
        // 把數據傳送到後臺
        this.updateTasks()
        this.newTask = ''
        this.$$.newTask.placeholder="知道做不到，等於不知道"
        this.$$.newTask.focus()
      },
      cancelNewTask: function(){
        this.showTextarea = !this.showTextarea
        this.newTask = ''
        this.updateTasks()
      },
      toggleCheckd: function(task){
        task.completed = ! task.completed
        this.updateTasks()
      },
      editTask: function(task){
        //console.log(task)
        this.removeTask(task)
        this.showTextarea = true
        this.newTask = task.body
        this.$nextTick(function(){
          if(!this.$$.newTask){
            console.log('已經return')
            return
          }
          //console.log(this)
          this.$$.newTask.focus()
        })
      },
      removeTask: function(task){
        this.tasks.$remove(task)
      },
      closeRemind: function(e){
        e.preventDefault()
        this.week = ''
      },
      updateTasks: function(){
        var data = {time:this.time,tasks: this.tasks}
        //console.log('更新tasks')
        //console.log(this.tasks)
        api.task.update(data,function(res){
          //console.log(res)
          if(res.showerror){
            this.showerror = res.showerror
            setTimeout(function(){
              this.showerror = false
            }.bind(this),2000)
          }else{
            this.$set('updateSuccess',res.update)
          }
        }.bind(this))
      }
    }
  }
</script>
<style>
  .person{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .showLeft{
    left: 80%;
  }

  .leftIn-enter,
  .leftIn-leave{
    left: 80%;
  }
  .aWeek{
    position: relative;
    width: 98%;
    height: 4rem;
    padding: 0 1%;
    text-align: center;
    border: 1px solid #eee;
  }
  .oneDay{
    width: 13%;
    height: 4rem;
    display: inline-block;
  }
  .oneDay>div{
    text-align: center;
    line-height: 2rem;
  }
  .oneDay>div:first-child{
    height: 2rem;
  }
  .oneDay>div:last-child{
    height: 2rem;
  }
  .on>div:first-child{
    color: rgba(102,102,153,1) ;
  }
  .on>div:last-child{
    background-color:rgba(102,102,153,.8) ;
    color: #fff;
  }
  .main{
    position: relative;
    width: 80%;
    min-height:76%;
    padding: 1.4rem 10% ;
    background: #f3f3fe;
  }
  .sunday-remind{
    position: absolute;
    z-index: 23333;
    width: 100%;
    height: 2rem;
    background: rgba(255, 51, 0, 1);
    color: #fff;
    text-align: center;
    line-height: 2rem;
    font-size: 1rem;
  }
  .close-remind{
    position: absolute;
    top: .2rem;
    right:2%;
    font-size: .6rem;
    color: #eee;
  }
  .cxl-box{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    height: 50%;
    width: 100%;
  }
  .cxl{
    width: 100%;
    height: 2rem;
    text-align: center;
    font-size:1rem;
  }

  .tasks>ol{
    margin-bottom: 1rem;
  }
  .task{
    position: relative;
    width: 96%;
    padding: 1rem 2%;
    border-bottom: 1px solid rgba(255,255,255,.4);
  }
  .task input[type="checkbox"]{
    display: inline-block;
    opacity: 1;
    width: 1rem;
    height: 1rem;
    background: url(./../../icon/active.png) no-repeat center center;
  }
  .addTaskBtn,
  .saveTaskBtn,
  .cancelTaskBtn{
    display: block;
    width: 2rem;
    height: 2rem;
    position: absolute;
    border-radius:1rem;
    background: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
  .addTaskBtn{
    background:rgba(102,102,153,1);
    bottom: 10%;
    right: 10%;
  }

  .saveTaskBtn{
    right: 10%;
    bottom:3.6rem;
  }
  .cancelTaskBtn{
    right: 10%;
    bottom: 7.2rem;
  }
  .addTaskBtn>img,
  .saveTaskBtn>img,
  .cancelTaskBtn>img{
    position: absolute;
    left: 0;top: 0;right: 0;bottom: 0;
    margin: auto;
    width: 1.4rem;
    height: 1.4rem;
  }
  .showTextarea-transition{
    transition: all .6s ease-in-out;
    position: absolute;
    right:22%;
    bottom:3.6rem;
    width: 60%;
    border: none;
    border-bottom: 2px solid #eee;
    background-color: inherit;
    padding: .6rem;
    font-size: 1rem;
  }
  .showTextarea-enter,
  .showTextarea-leave{
    height: 0;
    bottom: 0;
    opacity: 0;
  }
  .bounce-enter{
    animation:bounce-in .5s;
  }
  .bounce-leave{
    animation: bounce-out .5s;
  }

  @keyframes bounce-in{
    0%{
      transform:scale(0);
    }
    50%{
      transform:scale(1.2);
    }
    100%{
      transform:scale(1);
    }
  }

    @keyframes bounce-out{
    0%{
      transform:scale(1);
    }
    50%{
      transform:scale(1.2);
    }
    100%{
      transform:scale(0);
    }
  }
</style>