<template>
  <div class="map">
    <div id="myMap">
    </div>
    <canvas id="animation" class="fill-screen"></canvas>
    <canvas id="overlay" class="fill-screen"></canvas>
  </div>
</template>

<script setup>
import Map from './map'
import {onMounted} from 'vue'
onMounted(() => {
  const map = new Map({
    container: 'myMap',
    accessToken: 'pk.eyJ1IjoieXVuZXI5OTY4IiwiYSI6ImNrazY1cTh1bzAwc24yd3AyMzBnbmtiMXYifQ.KmABHgQ1OZ4EVax3poOzyA',
    style: require('./mapUrl/LandSea.json'),
    center: [122.23337794444444, 29.973452527777777],
    zoom: 9,
    dragRotate: false,
    trackResize: true,
    crossSourceCollisions: false
  }).init();
  console.log(map)
})
</script>

<style lang="scss">
.map {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  #myMap{
    width: 100%;
    height: 100%;
  }
}
.fill-screen {
  position: absolute;
  display: none;
  will-change: transform;
}
.mapboxgl-ctrl-bottom-right{
  display: none;
}
</style>