<template>
  <CardBox title="webgl鼠标绘制点" icon="icon-shizhong">
    <canvas id="glMousePoint" width="600" height="200" ref="glMousePoint"></canvas>
  </CardBox>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const glMousePoint = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null | undefined = null
const init = () => {
  initWebGl()
}
function initWebGl() {
  gl = GlMousePoint.value?.getContext('webgl')
  if (GlMousePoint.value && gl) {
    gl.viewport(0, 0, GlMousePoint.value?.clientWidth, GlMousePoint.value?.clientHeight)
    iniShaders(gl,
      `
      attribute vec4 a_position;
      void main() { gl_Position = vec4(a_position); gl_PointSize = 60.0; }`,
      `void main() { gl_FragColor = vec4(0, 0, 1.0, 1.0); }`)
    initBuffer()
    draw()
  }
}
function iniShaders(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  // 创建gl程序
  const program = gl.createProgram() as WebGLProgram
  // 创建定点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
  gl.shaderSource(vertexShader, vsSource)
  gl.compileShader(vertexShader)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
  gl.shaderSource(fragmentShader, fsSource)
  gl.compileShader(fragmentShader)
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  //连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  //启动程序对象
  gl.useProgram(program);
  //将程序对象挂到上下文对象上
  gl.program = program;
}
function initBuffer () {
  const pointList = []
  let aPosition = gl?.getAttribLocation(gl.program, 'a_position') as number
  GlMousePoint.value && GlMousePoint.value.addEventListener('mousedown', (e) => {
    if (GlMousePoint.value) {
      const x = e.offsetX
      const y = e.offsetY
      const width = GlMousePoint.value.clientWidth / 2
      const height = GlMousePoint.value.clientHeight / 2
      const left =  (x - width) / width
      const top = 1 - y / height
      pointList.push(left)
      pointList.push(top)
      pointList.push(0.0)
      pointList.push(1.0)
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
        gl.drawArrays(gl.POINTS, 0, pointList.length)
      }
    }
  })
}
function draw() {
  if (gl) {
    console.log('绘制点成功')
  }
}
onMounted(() => {
  init()
})
</script>


