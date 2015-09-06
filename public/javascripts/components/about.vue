<template>
  <div class="weekly"
    v-class="showLeft:showLeft"
    v-transition="leftIn">
    <leftbody show-left="{{@ showLeft}}" keep-alive></leftbody> 

    <div class="main">
      <div class="about">
        <p>行之 是為betahouse開發的週報管理應用</p>
        <h3>哲學層面</h3>
        <p>行之之名取自王陽明知行合一</p>
        <p>先生的心學主要包含以下三點，即</p>
        <p>心即理</p>
        <p>知行合一</p>
        <p>良知和致良知</p>
        <p>&nbsp;</p>
        <p>關於知行合一，先生在《傳習錄》中有言</p>
        <p>“未有知而不行著。知而不行，只是未知。.......有如知痛，必已自痛了，方知痛。知寒，必已自寒了。知飢，必已自飢了。知行如何分得開？””今人卻就將知行分作兩件去做，以為必先知了，然後能行。故遂終身不行，亦遂終身不知。”</p>

        <h3>技術層面</h3>

        <p>行之使用到的技術有</p>
        <p>mongoose    express.js    vue.js    node.js</p>
        <p>現已加入肯德基豪華開源套餐</p>
        <h3>改進行之</h3>

        <p>幫助行之改善UI設計</p>
        <p>幫助行之的代碼支撐更加健壯</p>
        <p>把遇到的問題，bug發送給我</p>
      </div>      
    </div> 
    <footerinfo></footerinfo>
  </div>
</template>

<script>
  var api = require('./../api.js')
  module.exports = {
    attached:function(){
      this.showLeft = false
    },
    repalce:true,
    data:function(){
      return {
        showLeft: false,
      }
    },

    components:{
      leftbody: require('./leftbody.vue'),
      footerinfo: require('./footer.vue')
    },

    methods: {
      toggleLeft: function(){
        this.showLeft = !this.showLeft
      }
    }
  }
</script>

<style>
  .weekly{
    position: absolute; 
    left: 0;
    width: 100%;
    height: 100%;
  }
  .showLeft{
    left: 80%;
  }
  .about>p{
    line-height:1.4rem;
    font-size: .9rem;
    letter-spacing: .1rem;
    font-weight: bold;
  }
  .about>h3{
    font-size: 1.1rem;
    margin:1.2rem 0 .8rem;
  }
</style>