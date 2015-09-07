var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/xingzhi')

var Schema = mongoose.Schema

var TaskSchema = new Schema({
  body:String,
  completed: Boolean
},{ _id: false })

var TasksSchema = new Schema({
  time:{type: String, index: true},
  tasks:[TaskSchema]
},{ _id: false })

var UserSchema = new Schema({
  name:String,
  email:{type: String, index:true,unique:true},
  password:String,
  header:String,
  weekly:[TasksSchema],
  weeklies:[TasksSchema],
  updatetime:Date
})

var User = mongoose.model('users',UserSchema)

module.exports = User
/*
{
  id:123,
  username:'念樹',
  email:'hbb@betahouse.us',
  password:'sdaFF4f4sd4a1xcv',
  header:'/images/hbb.jpg',
  weekly:[
    { //每天
      time:'2015-9-1',
      tasks:[
        {body:'one',completed:false},
        {body:'two',completed:false},
        {body:'three',completed:true}
      ]
    },
    {
      time:'2015-9-2',
      tasks:[
        {body:'one',completed:false},
        {body:'two',completed:false},
        {body:'three',completed:true}
      ]
    },
    {
      time:'2015-9-3',
      tasks:[
        {body:'one',completed:false},
        {body:'two',completed:false},
        {body:'three',completed:true}
      ]
    }
  ],
  weeklies:[
    {  // 每週
      time:'2015-9-1',
      tasks:[
        {body:'one',completed:false},
        {body:'two',completed:false},
        {body:'three',completed:true}
      ]
    },
    {
      time:'2015-9-2',
      tasks:[
        {body:'one',completed:false},
        {body:'two',completed:false},
        {body:'three',completed:true}
      ]
    },
    {
      time:'2015-9-3',
      tasks:[
        {body:'one',completed:false},
        {body:'two',completed:false},
        {body:'three',completed:true}
      ]
    }

  ]
}
*/ 