<script setup lang="ts">
import Clock from "./views/Clock.vue";
import CanvasOrHtml from "./views/CanvasOnHtml.vue";
import Bezier from "./views/Bezier.vue";
import ParticleText from "@/views/particle/ParticleText.vue";
import ParticleImage from "@/views/particle/ParticleImage.vue";
import ParticlePhysics from "@/views/particle/ParticlePhysics.vue";
// import Map from './components/map/Map.vue';
</script>

<template>
  <div class="canvas-list">
    <!-- <Map></Map> -->
    <Clock></Clock>
    <CanvasOrHtml></CanvasOrHtml>
    <Bezier></Bezier>
    <ParticleText />
    <ParticleImage />
    <ParticlePhysics />
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
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url("./assets/home_bg.png");
    background-repeat: no-repeat;
  }
  .canvas-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 620px);
    align-content: center;
    justify-content: center;
    grid-gap: 20px;
    padding: 10px;
    overflow-y: auto;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(1, 600px);
    }
  }
}
</style>
