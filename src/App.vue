
<script setup lang="ts">
import Clock from './views/clock.vue'
import CanvasOrHtml from './views/canvasOnHtml.vue'
// import Map from './components/map/Map.vue';
</script>

<template>
  <div id="app">
    <div class="canvas-list">
      <!-- <Map></Map> -->
      <Clock></Clock>
      <CanvasOrHtml></CanvasOrHtml>
    </div>
  </div>
</template>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url('./assets/app_bg.jpg');
    filter: blur(10px);
  }
  .canvas-list {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
}
</style>
