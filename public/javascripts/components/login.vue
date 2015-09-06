<template>
  <div class="login-box">
    <p class="error" v-show="showerror" v-transition="fade">密碼或者郵箱錯誤</p>
    <form v-on="submit:getLogin" method="POST">
      <span class="close-login"
        v-on="click:close">x</span>
      <img class="login-img" src="./../../images/header.jpg" alt="">
      <div>
        <input type="email" name="email" placeholder="xxx@betahouse.us" v-model="email" required>
        <input type="password" name="password" placeholder="Password" v-model="password" required>
        <input type="submit" value="LogIn">
      </div>
    </form>
  </div>
</template>

<script>

  var api = require('./../api.js')
  module.exports = {
    data:function(){
      return{
        email:'',
        password:'',
        showerror:false
      }
    },
    methods: {
      getLogin: function(e){
        e.preventDefault()
        var data = {
        email: this.email,
        password: this.password
        }
        api.user.login(data,function(res){
          // this.$root.view = "person"
          //console.log(res)
          if(res  && res.email){
            this.email = this.password = ''
            window.location.hash = '/person'
          }else{
            this.showerror = true
            setTimeout(function(){
              this.showerror = false
            }.bind(this),2000)
          }
        }.bind(this))
      },
      close: function(){
        window.location.hash = '/'
      }
    }
  }
</script>
<style>
  
  .login-box{
    position: relative;
    width:100%;
    height: 100%;
    background: url(./../../images/bg.jpg)
    no-repeat center center;
    background-color: rgba(102,102,153,.5);

    -moz-background-size: cover;
    -ms-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .login-img{
    position: absolute;
    left: 0;top: 6%; right: 0;
    margin:auto;
    height:25%;
    width: auto;
    border-radius: 50% 50% 50% 0;
  }
  .login-box form{
    position: absolute;
    background-color: rgba(225,225,225,.8);
    width:68%;
    height: 50%;
    margin-left: 16%;
    top: 20%;
    text-align: center;

  }
  .login-box form>div{
    width: 100%;
    height: 70%;
    position: relative;
    top:30%;
  }
  .login-box input{
    width: 60%;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: .9em;
    border: none;
    letter-spacing: .1rem;
    position: relative;
    
  }
  .login-box input[type="email"]{
    padding:.3em 1.6rem;
    bottom: -2rem;
    background: url(./../../icon/email.png) no-repeat left center;
    background-size: 1.2rem 1rem;
    border-bottom: 1px solid #eee;
  }
  .login-box input[type="password"]{
    padding:.3em 1.6rem;
    bottom: -2.6rem;
    background: url(./../../icon/password.png) no-repeat left center;
    background-size: 1.2rem 1.2rem;
    border-bottom: 1px solid #eee;
  }
  .login-box input[type="submit"]{
    display: block;
    color: #fff;
    background-color: rgba(102,102,153,.5);
    bottom: -5rem;
    left: 10%;
    width: 80%;
    height: 2.2rem;
    line-height: 2.2rem;
    padding: 0;
  }
  .login-box input[type="submit"]:hover,
  .login-box input[type="submit"]:link,
  .login-box input[type="submit"]:active{
    background-color: rgba(102,102,153,.7);
    
  }
  .login-box input:focus,
  .login-box input:hover{
    box-shadow:0 0 4px rgba(102,102,153,.8);
  }
  .close-login{
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: -.6rem;
    right: -.6rem;
    border-radius: .8rem;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    line-height: 1.6rem;
    cursor: pointer;
  }
</style>
