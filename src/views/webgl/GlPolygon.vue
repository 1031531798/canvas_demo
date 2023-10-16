<template>
  <CardBox title="webgl绘制多边形" icon="icon-shizhong">
    <canvas id="glPolygon" width="600" height="200" ref="glPolygon"></canvas>
  </CardBox>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { WebGl } from '../../utils/webgl';
const glPolygon = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null | undefined = null

const init = () => {
  initWebGl()
}
function initWebGl() {
  const webgl = new WebGl({
    el: GlPolygon.value || 'GlPolygon.vue'
  })
  gl = webgl.initGl()
  if (gl && webgl) {
    webgl.iniShaders(
      `attribute vec4 a_position;
      void main() { gl_Position = vec4(a_position); gl_PointSize = 60.0; }`,
      `void main() { gl_FragColor = vec4(0.6, 1, 0.8, 1.0); }`)
    initBuffer(webgl)
  }
}
function initBuffer (webgl: {program: WebGLProgram}) {
  const pointList = [
    0.5, -0.5, 0, 1.0,
    0.5, 0.5, 0, 1.0,
    -0, 0.5, 0, 1.0,
    -0.1, -0.5, 0, 1.0,
    -0.3, -0.5, 0, 1.0,
    -0.6, -0.5, 0, 1.0,
  ]
  let aPosition = gl?.getAttribLocation(webgl.program, 'a_position') as number
  let pointPostion = new Float32Array(pointList)
  if (gl) {
      // 创建webgl 缓冲区
      let pointBuffer = gl.createBuffer()
      // 绑定缓冲区
      gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
      // 设置缓冲区数据
      gl.bufferData(gl.ARRAY_BUFFER, pointPostion, gl.STATIC_DRAW)
      // 激活变量
      gl.enableVertexAttribArray(aPosition)
      // 告诉显卡从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据。
      gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 4*4, 0*4)
      // 清空画面
      gl.clearColor(0, 0, 0, 1.0)
      // 使用预设值来清空缓冲区
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_FAN, 0, pointList.length)
    }
}
onMounted(() => {
  init()
})
</script>


