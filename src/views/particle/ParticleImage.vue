<template>
  <CardBox title="生成粒子图片" icon="icon-shizhong">
    <div class="flex flex-row mb-10">
      <div class="flex flex-col">
        <div class="flex flex-row mb-4 mr-10">
          <div
            class="text-white p-2 bg-indigo-500 rounded-md ml-4 mr-4 cursor-pointer"
            @click="uploadImage"
          >
            上传图片
          </div>
          <div
            class="text-white p-2 bg-sky-500/100 rounded-md mr-4 cursor-pointer"
            @click="transformImage"
          >
            转换
          </div>
          <div
            class="text-white p-2 bg-green-500 rounded-md mr-4 cursor-pointer"
            v-if="showDownload"
            @click="downloadImage"
          >
            下载
          </div>
        </div>
        <div class="flex flex-col align-center justify-center">
          <img
            ref="imageDom"
            width="200"
            @load="handleLoad"
            :src="nativeImage.src"
            :alt="nativeImage.name"
          />
          <span class="text-white p-2">{{ nativeImage.name }}</span>
        </div>
      </div>
      <div class="flex flex-row mt-2 mb-2">
        <canvas
          id="particleCanvas"
          width="300"
          height="200"
          ref="particleCanvas"
        ></canvas>
      </div>
    </div>
  </CardBox>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Particle from "./particle";
import { getFileLocalUrl, openFileSelect } from "@/utils/file";

const particleCanvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
const imageDom = ref<HTMLImageElement>();
let particles: Particle[] = [];
const canvasImage = ref("");
const showDownload = ref<boolean>(false)
const nativeImage = ref<{ src: string; name: string; file: File | null }>({
  src: "",
  name: "",
  file: null,
});
onMounted(() => {
  if (particleCanvas.value) {
    ctx = particleCanvas.value?.getContext("2d") as CanvasRenderingContext2D;
  }
});
function handleLoad (e) {
  console.log(e)
}
function uploadImage() {
  openFileSelect({ accept: "image/*" }).then((files) => {
    if (files) {
      clearCanvas()
      nativeImage.value.name = files[0].name;
      nativeImage.value.file = files[0];
      getFileLocalUrl(files[0]).then((url) => {
        if (typeof url === "string") {
          nativeImage.value.src = url;
        }
      });
    }
  });
}
function transformImage() {
  if (!nativeImage.value.file || !imageDom.value) {
    alert("请上传图片");
    return;
  }
  if (ctx && particleCanvas.value) {
    drawImage();
    getImagePoint(particleCanvas.value, ctx);
    animate();
    showDownload.value = true
  }
}
function drawImage() {
  if (ctx && particleCanvas.value && imageDom.value) {
    ctx.drawImage(
      imageDom.value,
      0,
      0,
      particleCanvas.value.width,
      particleCanvas.value.height
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
  const diff = 2;
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
        let par = new Particle({ ctx, x: i, y: j, size: 1, color });
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
function downloadImage() {
  if (ctx && particleCanvas.value) {
    const dataURL = particleCanvas.value.toDataURL("image/png");
    const a = document.createElement("a");
    // 将数据 URL 分配给下载链接的 href 属性
    a.href = dataURL;
    // 设置下载链接的 download 属性，指定文件名
    a.download = "canvas_image.png";
    // 触发下载链接的点击事件
    a.click();
  }
}
function clearCanvas () {
  if (ctx && particleCanvas.value) {
    particles = []
    ctx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height);
  }
}
</script>
