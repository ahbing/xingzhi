<template>
  <component is="{{view}}"
    class="view"
    keep-alive
    v-transition
    transition-mode="out-in"
    publishtime="{{@ publishtime}}">
  </component>
  <!-- <pre>{{$data | json}}</pre> -->

</template>

<script>
var api = require('./api.js')
  module.exports = {
    el:'#app',
    data: {
      view: 'welcome',
      currentUser: {},
      tasks:[]
    },
    components: {
      'welcome': require('./components/welcome.vue'),
      'login':require('./components/login.vue'),
      'person':require('./components/person.vue'),
      'friends':require('./components/friends.vue'),
      'calendar':require('./components/calendar.vue'),
      'weekly':require('./components/weekly.vue'),
      'generateWeekly':require('./components/generateWeekly.vue'),
      'setup':require('./components/setup.vue'),
      'about':require('./components/about.vue')
    }
  }
</script>

<style>
  @import "./../stylesheets/base.css";
</style>


