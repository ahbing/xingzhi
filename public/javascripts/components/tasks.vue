<template>
  <div class="tasks-list">
    <h3>完成 ({{completions.length}})</h3>
    <ol>
      <li v-repeat="task in completions" v-text="task.body"></li>
    </ol>
    <h3>未完成 ({{remaining.length}})</h3>
    <ol>
      <li v-repeat="task in remaining" v-text="task.body"></li>
    </ol>
  </div>
</template>

<script>
  module.exports = {
    replace: true,
    props: ['tasks'],
    data: function(){
      return {
        filters: {
          isProcess: function(task){
            return ! task.completed
          },
          completed: function(task){
            return task.completed
          }
        }
      }
    },
    computed: {
      completions: function(){
        return this.tasks.filter(this.filters.completed)
      },
      remaining: function(){
        return this.tasks.filter(this.filters.isProcess)
      }
    }
  }
</script>

<style>
  .tasks-list{
    width: 100%;
  }
  .tasks-list>h3{
    margin:.8rem 0;
  }
  .tasks-list>ol{
    width: 90%;
    padding: .2rem 5%;
  }
  .tasks-list li{
    padding:.2rem 0;
  }
</style>