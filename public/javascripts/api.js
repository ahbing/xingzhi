var Vue = require('vue')
Vue.use(require('vue-resource'))

Vue.http.options.root = '/root'
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'

var USER_KEY = 'beta'

exports.register = function(app){
  var currentUser = localStorage[USER_KEY]
  if(currentUser){
    try{
      currentUser = JSON.parse(currentUser)
    }catch(e){
      delete localStorage[USER_KEY]
      currentUser = {}
    }
    app.currentUser = currentUser
  }
}

exports.task = {
  gettasks: function(time,cb){
    var url = '/gettasks/'+time
    return Vue.http.get(url,function(res){
      console.log(res)
      cb && cb(res)
    })
  },
  weekly: function(time,userId,cb){
    var url = '/weekly/'+time+'/user/'+userId
    return Vue.http.get(url,cb)
  },
  update: function(data,cb){
    return Vue.http.post('/update',data,function(res){
      console.log(res)
      cb && cb(res)
    })
  },
  //生成週報預覽
  preWeekly: function(cb){
    return Vue.http.get('/preweekly',cb)
  },
  //提交週報
  publish: function(time,cb){
    return Vue.http.get('/publish/'+time,cb)
  }
}

exports.user = {
  login: function(data, cb){
    delete localStorage[USER_KEY]
    return Vue.http.post('/login', data,function(user){
      //browser
      if(user && user.email){
        console.log(user)
        trackUser(user)
      }
      cb && cb(user)
    })
  },
  checkuser: function(cb){
    return Vue.http.get('/welcome', function(res){
      if(res && res.id){
        trackUser(res)
      }
      cb && cb(res)
    })
  },
  logout: function(cb){
    clearUser()
    return Vue.http.delete('/login',cb)
  },
  friends: function(cb){
    return Vue.http.get('/friends',cb)
  },
  // 一個人  所有週報title
  friend: function(id,p,cb){
    return Vue.http.get('/friend/'+id+'/page/'+p,cb)
  }
}


function trackUser(user){
  Vue.app.currentUser = user
  localStorage[USER_KEY] = JSON.stringify(user)
}

function clearUser(){
  Vue.app.currentUser = {}
  delete localStorage[USER_KEY]
}
