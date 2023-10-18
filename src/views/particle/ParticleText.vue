<template>
  <CardBox title="文字转换粒子形态" icon="icon-shizhong">
    <div>
      <input v-model="text" placeholder="输入转换的文字" />
      <button @click="transformText">转换</button>
      <button @click="clearCanvas">清除</button>
    </div>
    <canvas id="particleCanvas" width="500" height="300" ref="particleCanvas"></canvas>
  </CardBox>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Particle from './particle'
const particleCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const text = ref('')
let particles: Particle[] = []
const canvasImage = ref('')
onMounted(() => {
  if (particleCanvas.value) {
    ctx = particleCanvas.value?.getContext('2d') as CanvasRenderingContext2D
  }
})
function clearCanvas () {
  if (ctx && particleCanvas.value) {
    particles = []
    ctx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height);
  }
}
function transformText () {
  if (text.value && ctx && particleCanvas.value) {
    drawText(text.value)
    getImagePoint(particleCanvas.value, ctx)
    animate()
  }
}
function drawText (text = 'canvas text') {
  if (ctx && particleCanvas.value) {
    ctx.beginPath()
    ctx.font = "50px Arial"; // 设置字体大小和字体类型
    ctx.fillStyle = "blue"; // 设置文本颜色
    ctx.textAlign = "center"; // 设置文本水平对齐方式
    ctx.textBaseline = "middle"; // 设置文本垂直对齐方式
    // 绘制实心文本
    // ctx.fillText("Sample String", 10, 50);
    ctx.fillText(text, particleCanvas.value.width / 2, particleCanvas.value.height / 2);
  }
}
// 获取像数
function getImagePoint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvasImage.value = canvas.toDataURL("image/png");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const diff = 4;
  for (let j = 0; j < canvas.height; j += diff) {
    for(let i = 0; i < canvas.width; i += diff) {
      const opacityIndex = (i + j * canvas.width) * 4 + 3;
      if (imageData.data[opacityIndex] > 0) {
        // 放入粒子对象
        let par = new Particle({ctx, x: i, y: j, size: 1})
        particles.push(par)
      }
    }
  }
}
function animate() {
  if (ctx && particleCanvas.value) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height);

    for (const particle of particles) {
      particle.update();
    }
  }

}
</script>


