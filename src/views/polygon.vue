<template>
  <card-box title="多边形" icon="icon-shizhong">
    <canvas id="polygonCanvas" width="600" height="200" ref="polygonRef"></canvas>
  </card-box>
</template>
<script setup lang="ts">
  import {onMounted, ref} from 'vue'
  const bezierRef = ref<HTMLCanvasElement | null>(null)
  let ctx: CanvasRenderingContext2D | null = null
  onMounted(() => {
  if (bezierRef.value) {
    ctx = bezierRef.value?.getContext('2d') as CanvasRenderingContext2D
    ctx.beginPath()
    ctx.font = '17px Arial'
    ctx.fillText('二次贝塞尔曲线绘制', 60, 20)
    // 绘制二次贝塞尔曲线
    ctx.beginPath();
    ctx.strokeStyle = 'green'
    ctx.moveTo(100,100);
    ctx.quadraticCurveTo(120, 110, 120, 120)
    ctx.quadraticCurveTo(120, 100, 165, 55)
    ctx.stroke()
    // 绘制三次贝塞尔曲线
    ctx.fillText('三次贝塞尔曲线绘制', 360, 20)
    ctx.beginPath();
    ctx.strokeStyle = 'green'
    ctx.moveTo(400,40);
    ctx.bezierCurveTo(380, 100, 470, 110, 460, 180)
    ctx.stroke()
  }
})
</script>


