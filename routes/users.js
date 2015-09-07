var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')

var crypto = require('crypto')
var User = require('../models/User')

var userArr = [
  {abbreviation:'hll',name:'黃琳琅'},
  {abbreviation:'hly',name:'黃麗雅'},
  {abbreviation:'llh',name:'李璐慧'},
  {abbreviation:'wbq',name:'吳冰清'},
  {abbreviation:'yg',name:'余剛'},
  {abbreviation:'zcl',name:'朱崇磊'},
  {abbreviation:'xjy',name:'許駿宇'},
  {abbreviation:'cx',name:'陳茜'},
  {abbreviation:'hpf',name:'胡鵬飛'},
  {abbreviation:'ly',name:'李毅'},
  {abbreviation:'mkq',name:'麻凱倩'},
  {abbreviation:'xzy',name:'夏之韻'},
  {abbreviation:'hbb',name:'黃炳炳'}
]

/* GET users listing. */
router.post('/addUser', function(req, res, next) {
  var body = req.body,
      email = body.email,
      password = body.password,
      name = body.name
  var newPsw = crypto.createHash('sha1').update(password).digest('hex')

  User.findOne({email:email},function(err,user){
    if(err) return console.log(err)

    //console.log(user)
    if(user && user.email){
      return res.redirect('back')
    }
    var newUser = {
      name:name,
      password:newPsw,
      email:email
    }
    saveUser(newUser,function(){
      //console.log('hello')
      return res.direct('/')
    })
  })
})


router.get('/userList',function(req,res){

})

router.get('/addUser', function(req, res, next) {
  if(req.session.user.email!=='hbb@betahouse.us') return res.redirect('/')
  res.render('addUser',{
    title:"添加數據"
  })
});

router.get('/addAndSendEmail', function(req, res, next) {
  if(req.session.user.email!=='hbb@betahouse.us') return res.redirect('/')
  userArr = userArr.map(function(itme,index){
    if(itme.password || itme.email){
      return
    }
    itme.email = itme.abbreviation+'@betahouse.us'
    //  生成一個 固定的 隨機密碼
    itme.password = itme.abbreviation+index+2+index*index+2
    return itme
  })

  //console.log(userArr)
  userArr.forEach(function(item){
    var password = item.password
        name = item.name
        email = item.email
    var newPsw = crypto.createHash('sha1').update(password).digest('hex')
    var newUser = {
      name:name,
      password:newPsw,
      email:email
    }

    User.findOne({email:email},function(err,user){
      if(err) return console.log(err)

      if(user && user.email){
        return res.redirect('/userList')
      }

      saveUser(newUser,function(user){
        //console.log('hello')
        //  發送郵件
        //console.log(user)
        send(user.name,user.email,password)
      })
    })
  })

  //userArr 清空
  userArr = []
  return res.redirect('/userList')
});

function saveUser(newUser,cb){
  var user = new User(newUser)

  user.save(function(err,user){
    if(err){
      return console.log(err)
    }
    cb && cb(user)
  })
}

function send(name,email,password){
  var transporter = nodemailer.createTransport({
        "aliases": ["QQ Enterprise"],
        "domains": [
            "exmail.qq.com"
        ],
        "host": "smtp.exmail.qq.com",
        "port": 465,
        "secure": true,
        auth: {
          user: 'hr@betahouse.us',
          pass: 'beta22'
        }
  })

  var mailOptions = {
        from: 'hr@betahouse.us',
        to: email ,
        subject: '行之 測試邀請',
        html: 'hello'+name+',真是好久不見啦！<br>'+
              '這是 行之 的一封測試邀請郵件。<br>'+
              ' 行之 是betahouse的自助週報應用。<br>'+
              '行之的UI設計是移動端優先的 <br>'+
              '所有我更想知道他在各位的手機和平板上面的效果如何，有無bug<br>'+
              '如果你覺得 行之 有哪裡需要改進，或者你的建議，都可以回復給我。<br>'+
              '現在你有可以用'+email+'作為賬戶,<br>'+password+'作為密碼登錄 行之<br>'+
              '你的所有測試數據將在正式啟用 行之 的時候清除<br>'+
              '<br>'+
              '<a href="http://betahouse.us:8888" target="_blank">進入行之</a>'+
              '<br>'+
              '如果上述鏈接無法打開，可以在瀏覽器端輸入  http://betahouse.us:8888 '+
              '<br>'+
              '<br>'+
              '盼復<br>'+
              '行之 敬上'
  }

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      return console.log(err);
    }
    console.log(info)
  });
}

module.exports = router;
