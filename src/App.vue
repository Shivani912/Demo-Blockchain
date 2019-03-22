<template>

  <div id="app">
    
  <block></block>
    
  </div>

</template>

<script>
import block from '@/components/block.vue'
export default {
  name: 'app',
  components: {
    block
  }  
}
</script>


<style>
#app {
  font-family: DINPro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height: 2;
  margin-top: 60px;
  font-size: 1rem;
}
body {
  background-color: #f8f9fa;
}

</style>



