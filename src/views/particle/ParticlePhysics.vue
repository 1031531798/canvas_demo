<template>
  <CardBox title="粒子物理效果" icon="icon-shizhong">
    <div class="flex flex-row mb-10">
      <div class="flex flex-col">
        <div class="flex flex-col align-center justify-center">
          <img
            v-show="false"
            ref="imageDom"
            width="300"
            height="400"
            @load="imageLoad"
            src="./a7e3eba32946690f-removebg-preview.png"
            :alt="nativeImage.name"
          />
          <span class="text-white p-2">{{ nativeImage.name }}</span>
        </div>
      </div>
      <div class="flex flex-row mt-2 mb-2">
        <canvas
          id="particleCanvas"
          width="600"
          height="400"
          ref="particleCanvas"
        ></canvas>
      </div>
    </div>
  </CardBox>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Particle from "./particle";
import PhysicsParticle from "@/views/particle/physicsParticle";

const particleCanvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
const imageDom = ref<HTMLImageElement>();
let particles: Particle[] = [];
const canvasImage = ref("");
const showDownload = ref<boolean>(false)
const mouse = {
  x: 0,
  y: 0
}
const nativeImage = ref<{ src: string; name: string; file: File | null }>({
  src: "",
  name: "",
  file: null,
});
onMounted(() => {
  if (particleCanvas.value) {
    ctx = particleCanvas.value?.getContext("2d") as CanvasRenderingContext2D;
    particleCanvas.value.addEventListener('mousemove', (e) => {
      mouse.x = e.offsetX
      mouse.y = e.offsetY
    })
  }
});
function imageLoad () {
  transformImage()
}
function transformImage() {
  if (ctx && particleCanvas.value) {
    drawImage();
    getImagePoint(particleCanvas.value, ctx);
    animate();
    showDownload.value = true
  }
}
function drawImage() {
  if (ctx && particleCanvas.value && imageDom.value) {
    const canvas = particleCanvas.value
    const sx = canvas?.width / 2 - imageDom.value?.width / 2
    const sy = canvas?.height / 2 - imageDom.value?.height / 2
    ctx.drawImage(
      imageDom.value,
      sx,
      sy,
      imageDom.value.width,
      imageDom.value.height
    );
  }
}
// 获取像数
function getImagePoint(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  canvasImage.value = canvas.toDataURL("image/png");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const diff = 3;
  for (let j = 0; j < canvas.height; j += diff) {
    for (let i = 0; i < canvas.width; i += diff) {
      const opacityIndex = (i + j * canvas.width) * 4 + 3;
      if (imageData.data[opacityIndex] > 0) {
        const color = `rgba(${imageData.data[opacityIndex - 3]},${
          imageData.data[opacityIndex - 2]
        }, ${imageData.data[opacityIndex - 1]}, ${
          imageData.data[opacityIndex]
        })`;
        // 放入粒子对象
        let par = new PhysicsParticle({ canvas: particleCanvas.value, ctx, x: i, y: j, size: diff, color, mouse });
        particles.push(par);
      }
    }
  }
}
function animate() {
  if (ctx && particleCanvas.value) {
    requestAnimationFrame(animate);
    ctx.clearRect(
      0,
      0,
      particleCanvas.value.width,
      particleCanvas.value.height
    );

    for (const particle of particles) {
      particle.update();
    }
  }
}
</script>
