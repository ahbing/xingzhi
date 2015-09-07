var Vue = require('vue')
var vueTouch = require('vue-touch')
var Router = require('director').Router

Vue.use(vueTouch)
vueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

var app = new Vue(require('./app.vue'))
var router = new Router()
Vue.app = app
require('./api').register(app)

router.on('/',function(){
  app.view = 'welcome'
})

router.on('/login',function(){
  if(app.currentUser.email){
    app.view = 'person'
  }else{
    app.view = 'login'
  }
})

router.on('/person',function(){
  if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'person'
})

// 我的日曆表
router.on('/calendar',function(){
  if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'calendar'
})

//朋友列表  所有朋友
router.on('/friends',function(){
  if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'friends'
})

// // 該朋友的日曆表
router.on('/friend/:id',function(id){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  //console.log(id)
  app.view = 'calendar'
})

// // 某人 某一週 的週報  不可編輯狀態
router.on('/weekly/:time/user/:userId',function(){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'weekly'
})
router.on('/weekly',function(){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'weekly'
})
// // 某人 某一週 的週報  不可編輯狀態
router.on('/gweekly',function(){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'generateWeekly'
})

//提交週報之後回到日曆
router.on('/publish',function(id){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'calendar'
})
router.on('/setup',function(){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'setup'
})

router.on('/about',function(){
 if(!app.currentUser.email){
    return app.view = 'login'
  }
  app.view = 'about'
})


router.init()




