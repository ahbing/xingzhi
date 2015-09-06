var express = require('express')
var router = express.Router()

var crypto = require('crypto')
var User = require('../models/User')

/* GET users listing. */
router.post('/addUser', function(req, res, next) {
  var body = req.body,
      email = body.email,
      password = body.password,
      name = body.name
  var shasum = crypto.createHash('sha1')
  shasum.update(password)
  var newPsw = shasum.digest('hex')
  var newUser = {
    name:name,
    password:newPsw,
    email:email
  }
  var user = new User(newUser)

  user.save(function(err,user){
    if(err){
      return console.log(err)
    }
    console.log(newUser)
    res.redirect('back')
  })
  
});

router.get('/addUser', function(req, res, next) {
  if(!req.session.user._id) return res.redirect('/')
  res.render('addUser',{
    title:"添加測試數據"
  })
});
module.exports = router;
