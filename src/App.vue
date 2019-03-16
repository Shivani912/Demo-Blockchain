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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
