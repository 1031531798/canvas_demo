<template>
  <div class="canvas-html-box">
    <card-box title="canva框选绘制（鼠标左键按下开始框选 松开结束框选）" icon="icon-jurassic_choose-mjbj">
      <canvas id="htmlCanvas" ref="htmlCanvasRef" width="600" height="200">
      </canvas>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { windowToCanvas, locationType } from '../utils/utils';
import * as _ from 'lodash';
const htmlCanvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let isActive = false
let location: locationType = {
  x: 0,
  y: 0
}
let beforeXy: locationType= {
  x: 0,
  y: 0
}

onMounted(() => {
  if (htmlCanvasRef.value) {
    const canvas = htmlCanvasRef.value as HTMLCanvasElement
    ctx = htmlCanvasRef.value?.getContext('2d') as CanvasRenderingContext2D
    canvas.addEventListener('mousemove', _.throttle((e) => {
      if (ctx instanceof CanvasRenderingContext2D && location) {
        const prev = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        ctx.fillRect(0, 0, 600, 300);
        ctx.globalCompositeOperation =  prev
      }
      location = windowToCanvas(htmlCanvasRef.value as HTMLCanvasElement, e.clientX, e.clientY)
      if (isActive) {
        drawBox()
      }else {
        ctx?.clearRect(0, 0, 600, 300)
      }
      
    }, 28))
    // 监听鼠标按下事件 开始框选
    canvas.addEventListener('mousedown', (e) => {
      beforeXy = windowToCanvas(htmlCanvasRef.value as HTMLCanvasElement, e.clientX, e.clientY)
      isActive = true
      drawBox()
    })
    // 监听鼠标抬起事件 结束框选
    canvas.addEventListener('mouseup', () => {
      isActive = false
    })
    canvas.addEventListener('mouseout', () => {
      ctx?.clearRect(0, 0, 600, 300)
    })
  }
})
// 绘制框选窗口
function drawBox () {
  const context = ctx || htmlCanvasRef.value?.getContext('2d') as CanvasRenderingContext2D
  const prev = context.globalCompositeOperation;
  context.globalCompositeOperation = "source-out";
  context.setLineDash([5])
  context.beginPath()
  const boxWidth = Math.abs(location.x - beforeXy.x)
  const boxHeight = Math.abs(location.y - beforeXy.y)
  if (location.x > beforeXy.x && location.y > beforeXy.y) {
    // 第四象限
    context.rect(beforeXy.x, beforeXy.y, boxWidth, boxHeight)
  }else if(location.x < beforeXy.x && location.y < beforeXy.y){
    // 第二象限
    context.clearRect(location.x, location.y, boxWidth, boxHeight)
    context.rect(location.x, location.y, boxWidth, boxHeight)
  }else if (location.x > beforeXy.x && location.y < beforeXy.y) {
    // 第一象限
    context.clearRect(beforeXy.x, location.y, boxWidth, boxHeight)
    context.rect(beforeXy.x, location.y, boxWidth, boxHeight)
  } else {
    // 第三象限
    context.clearRect(location.x, beforeXy.y, boxWidth, boxHeight)
    context.rect(location.x, beforeXy.y, boxWidth, boxHeight)
  }
  context.globalCompositeOperation =  prev
  context.stroke()
}
</script>
<style lang="scss" scoped>
#htmlCanvas{
  cursor: move;
}
</style>