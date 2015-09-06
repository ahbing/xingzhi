var express = require('express')
var router = express.Router()

var crypto = require('crypto')
var User = require('../models/User')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hello todo' })
})


router.post('/login', function(req, res) {
  var body = req.body,
      email = body.email,
      password = body.password
  var shasum = crypto.createHash('sha1')
  shasum.update(password)
  password = shasum.digest('hex')

  User.findOne({email:email},{"weeklies":0,"weekly":0},function(err,user){
    if(err){
      return console.log(err)
    }
    if(user && user.password == password){
      req.session.user = user
      user.password = '*******'
      res.write(JSON.stringify(user));
      res.end()
    }else if(user && user.password !== password){
      return res.redirect('/welcome')
    }else if(!user){
      return res.redirect('/welcome')
    }
  })
})

router.get('/welcome',function(req,res){
  // console.log(req.session.user)
  var user = req.session.user
  if(user){
    //用戶已經登錄  可以查看person頁面
    res.write(JSON.stringify(user))
  }else{
    res.write('login')
  }
  res.end()
})

router.get('/gettasks/:time',function(req,res){
  var time = req.params.time
  var id = req.session.user._id
  User.findOne({_id:id},{_id:0,weekly:1},function(err,user){
    if(err){
      return console.log(err)
    }
    var weekly = user.weekly
    var tasks = weekly.filter(function(item){
      return item.time == time
    })
    var data = {
      tasks: tasks[0] ? tasks[0].tasks : []
    }
    res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
    res.write(JSON.stringify(data))
    res.end()
  })  
})


router.get('/friends',function(req,res){
  // 數據庫查詢所有用戶 id name header updatetime 字段

  var userId = req.session.user._id
  //console.log(userId)  
  //去除和登錄用戶相同id的user  即 去除本人

  User.find({},{name:1,header:1,updatetime:1},function(err,users){
    if(err){
      return console.log(users)
    }
    //console.log(users)
    var data = {
      friends:users
    }
    res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
    res.write(JSON.stringify(data))
    res.end()
  })
})


router.get('/friend/:id/page/:page',function(req,res){
  var friendId = req.params.id
  var page = req.params.page
  //  數據庫查詢
  //console.log(friendId,page)
  //每次請求顯示8個信息的週報入口
  var num = 8
  friendId = friendId=='me'? req.session.user._id:friendId
  //console.log(friendId)
  User.findById(friendId,{weeklies:1,name:1},function(err,user){
    //console.log(user)
    weeklies = user.weeklies
    name = user.name
    var times = weeklies.map(function(item,index){
      var arr = []
      //console.log(item)
      arr[index] = item['time']
      return arr
    })

    //console.log(times)
    var data = {
      friendId:friendId,
      name:name,
      weeklies:times
    }
    //console.log(data)
    res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
    res.write(JSON.stringify(data))
    res.end()

  })
})


router.get('/weekly/:time/user/:userId',function(req,res){
  var time = req.params.time
  var userId = req.params.userId
  //數據庫查詢
  if(time == 'last'  && userId == 'me'){
    userId = req.session.user._id
  }

  User.findById(userId,{password:0,weekly:0},function(err,user){
    if(err){
      return console.log(err)
    }
    //console.log(user)
    var weeklies = user.weeklies

    if(weeklies && !weeklies.length) return

    if(time == 'last'){
      var rtime = weeklies[0].time
      var rtasks = weeklies[0].tasks
    }else{
      var weekly = weeklies.filter(function(item){
        return item.time == time
      })
      //console.log(weekly)
      var rtime = weekly[0].time
      var rtasks = weekly[0].tasks
    }

    var data = {
      user:{
        id:userId,
        name:user.name,
        header:user.header,
        email:user.email
      },
      time:rtime,
      tasks:rtasks
    }
    res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
    res.write(JSON.stringify(data))
    res.end()
  })
})

//update tasks
router.post('/update',function(req,res){
  // 更新 數據庫的  weekly 字段   
  // 更新完畢  將數據庫的正是數據返回 重新渲染前端
  var body = req.body
      time = body.time
      tasks = body.tasks
      userId = req.session.user._id
      data = {update:true}
  //console.log(body)
  User.findById(userId,{'weekly':1,'weeklies':1,"_id":0},function(err,user){
      if(err){
        data = {update:false}
        return console.log(err)
      }
      //console.log('---------')
      //console.log(user)
      var theWeekly = user.weekly
      var weeklies = user.weeklies
      var date = new Date()
      var updateDay = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()

      var hasWeekliesTime = weeklies.map(function(item){
        return item.time
      }).filter(function(item){
        return item == updateDay
      })

      //console.log(hasWeekliesTime)
      //  如果已經存在今天為日期的週報   說明已經提交過  那麼 今天的更新就不再  添加到 weekly了
      if(hasWeekliesTime && hasWeekliesTime.length){
        //console.log('return update')
        res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
        res.write(JSON.stringify({showerror:true}))
        return res.end()
      }

      //當weekly 什麼數據都沒有的時候  添加第一個
      if(!theWeekly.length){
        User.update(
          {_id:userId},
          {$push:{weekly:body}},
          function(err){
            if(err){
              data = {update:false}
              return console.log(err)
            }
          }
        )
      }else{
        var days = theWeekly.filter(function(day){
          return day.time == time
        }) 
       // console.log('--------------------')
       // console.log(days)
        }
        if(days && !days.length){
          //新添加  一般是新的一天
          User.update(
            {_id:userId},
            {$push:{weekly:body}},
            function(err){
              if(err){
                data = {update:false}
                return console.log(err)
              }
            }
          )
        }else if(days &&　days.length){
          //更新  已添加tasks的天
         // console.log('new update')
          User.update(
            {'weekly.time':time},
            {'$set':{'weekly.$.tasks':tasks}},
            function(err){
              if(err){
                data = {update:false}
                return console.log(err)
              }
            }
          )
        }

        res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
        res.write(JSON.stringify(data))
        res.end()
    })
    
})


router.get('/preweekly',function(req,res){
  var userId = req.session.user._id
  //console.log(userId)
  User.findById(userId,{weekly:1},function(err,user){
    //console.log(user)
    var weekly = user.weekly
      // 讀取weekly 的數據
    var data = {
      weekly:weekly
    }
    res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
    res.write(JSON.stringify(data))
    res.end()
  })
})

router.get('/publish/:time',function(req,res){
  var userId = req.session.user._id
  //根據id 將weekly 的數據存到 weeklies 裡面 
  // 將其清空
  var time = req.params.time
  User.findById(userId,{weekly:1,weeklies:1},function(err,user){
    if(err){
      return console.log(err)
    }
    var weekly = user.weekly
    var weeklies = user.weeklies

    var hasWeekly = weeklies.filter(function(item){
      return item.time == time
    })
    //console.log('已經提交過了')
    //console.log(hasWeekly)
    //如果該期週報已經儲存  就直接return
    if(hasWeekly && hasWeekly.length){
      res.writeHead(200,  {"Content-Type": "text/html;charset:utf-8"})
      res.write(JSON.stringify({hasPublished:true}))
      return res.end()
    }
    //console.log(weekly)


    var tasks = weekly.map(function(item){
      return item.tasks
    }).reduce(function(a,b){
      return a.concat(b)
    })

    //console.log(time)
    //console.log(tasks)
    var newWeekly = {
      time: time,
      tasks:tasks
    }
    //console.log(newWeekly)
    User.findByIdAndUpdate(userId,{
      $push:{weeklies:newWeekly},
      $set:{weekly:[]}
    },function(err,newUser){
      if(err){
        console.log(err)
      }
      // console.log(newUser)
      res.end()
    })
  })
})

router.delete('/login',function(req,res){
  req.session.user = {}
  res.end()
})


module.exports = router
