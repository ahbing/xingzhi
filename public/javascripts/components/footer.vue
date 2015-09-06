<template>
  <footer>
    <span class="copy">Copyright &copy; <span v-text="year"></span></span>
    <span class="source"> <a target="_blank" href="https://github.com/ahbing/xingzhi">xingzhi</a> • <a target="_blank" href="http://huangbingbing.com">念樹</a></span>
  </footer>
</template>
<script>
module.exports = {
  replace:true,
  data:function(){
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style>
  footer{
    color: #ccc;
    position: relative;
    padding: .2rem 0;
    left: 2%;
    width: 96%;
    background-color: transparent;
    font-size: .8rem;
  }
  footer span{
    font-weight: lighter;
  }
  footer a{
    color:rgba(102,102,153,1);
  }
  .source{
    float: right;
  }
</style>
