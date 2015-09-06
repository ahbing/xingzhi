<template>
   <div class="setup-box"
    v-class="showLeft:showLeft"
    v-transition="leftIn">
    <leftbody show-left="{{@ showLeft}}" active="{{active}}" keep-alive></leftbody> 

    <div class="main">
      <header v-if="!showEditHead" class="w-header">
        <a class="userheader" href="/#/person">
          <img v-show="!showColor" attr="src:user.header" alt="header">
        </a>
        <div class="showColor"
          v-show="showColor"
          v-text="user.name.slice(0,1)"
          v-style=" background-color: 'rgba(102,102,153,.8)',color:'#eee'">
        </div>
        <span class="username w-username" v-text="user.name.slice(1)"></span>
        <a v-on="click:editHead" class="setup-edit" href="#">
          <img src="./../../icon/edit.png" alt="">
        </a>
      </header>
      <p v-if="showEditHead">咦？ 怎麼不見了  也許功能還沒有上線吧 : )</p>
    </div> 
     <footerinfo></footerinfo>   
  </div>
</template>

<script>
  module.exports = {
    ready:function(){
      var user = JSON.parse(localStorage.getItem('beta'))

      console.log(user)
      user = user ? user : this.user
      this.$set('user',user)
    },
    attached:function(){
      this.showLeft = false
    },
    repalce:true,
    data:function(){
      return {
        showLeft: false,
        showEditHead:false,
        user:{
          name:'行之',
          header:'./../../images/header.jpg'
        },
        showColor:true
      }
    },
    methods: {
      editHead: function(e){
        e.preventDefault()
        this.showEditHead = true;
      }
    },
    components:{
      leftbody: require('./leftbody.vue'),
      footerinfo: require('./footer.vue'),
    }
  }
</script>
<style>
  .setup-box{
    position: absolute; 
    left: 0;
    width: 100%;
    height: 100%;
  }
  .setup-edit{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .setup-edit>img{
    width: 1.2rem;
    height: 1.2rem;
  }
  .showLeft{
    left: 80%;
  }
</style>