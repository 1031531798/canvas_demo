<template>
  <CardBox title="canvas时钟" icon="icon-shizhong">
    <canvas id="clockCanvas" width="600" height="200" ref="clockRef"></canvas>
  </CardBox>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
const clockRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const clockSetting = {
  hoursLen: 35,
  hoursWidth: 3,
  minuteLen: 50,
  minuteWidth: 2,
  secondLen: 60,
  secondWidth: 1,
}
onMounted(() => {
  if (clockRef.value) {
    ctx = clockRef.value?.getContext('2d') as CanvasRenderingContext2D
    // 定时刷新
    setInterval(() => {
      drawClock()
    }, 1000)
  }
})
function drawClock () {
    if (clockRef.value) {
      ctx = ctx || clockRef.value.getContext('2d') as CanvasRenderingContext2D
      ctx.clearRect(0, 0, 600, 200)
      // 绘制外圈
      ctx.beginPath();
      ctx.arc(300, 100, 80, 0, 2 * Math.PI)
      ctx.stroke()
      // 绘制圆心
      ctx.beginPath();
      ctx.arc(300, 100, 2, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
      // 绘制时间刻度
      drawTimeScale()
      // 绘制时分秒
      drawHoursLine()
    }
}
// 绘制小时文字
function drawTimeScale () {
  if (ctx) {
    const context = ctx as CanvasRenderingContext2D
    let hoursList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    let textRadius = 90
    let angle = 0
    let hoursWidth: number | undefined = 0;
    context.beginPath()
    hoursList.forEach(hours => {
      // Math.PI / 6 得到30度的弧度值  然后减去90度 因为默认是3点方向 将正方向改为12点开始
      angle = Math.PI / 6 * (Number(hours) - 3)
      hoursWidth = context.measureText(hours).width
      // Math.cos 根据弧度值求余弦
      context.fillText(hours, 300 + Math.cos(angle) * textRadius - hoursWidth / 2, 100 + Math.sin(angle) * textRadius + 5)
    })
  }
}
// 绘制时分秒
function drawHoursLine () {
  if (ctx) {
    const context = ctx as CanvasRenderingContext2D
    context.beginPath()
    let cHours = new Date().getHours()
    let text = 'AM'
    if (cHours >= 12) {
      cHours -= 12
      text = 'PM'
    }
    const cMinute = new Date().getMinutes()
    const cSecond = new Date().getSeconds()
    // 绘制时针
    const hAngle = Math.PI / 6 * (Number(cHours) + (cMinute / 60) - 3)
    const hLen = clockSetting.hoursLen
    context.lineWidth = clockSetting.hoursWidth || 3
    context.moveTo(300, 100)
    context.lineTo(300 + Math.cos(hAngle) * hLen, 100 + Math.sin(hAngle) * hLen )
    context.stroke()
    // 绘制分针
    const mAngle = Math.PI / 6 * (Number(cMinute) / 5 - 3)
    const mLen = clockSetting.minuteLen
    context.lineWidth = clockSetting.minuteWidth || 2
    context.moveTo(300, 100)
    context.lineTo(300 + Math.cos(mAngle) * mLen, 100 + Math.sin(mAngle) * mLen )
    context.stroke()
    // 绘制秒针
    const sAngle = Math.PI / 6 * (Number(cSecond) / 5  - 3)
    const sLen = clockSetting.secondLen
    context.lineWidth = clockSetting.secondWidth || 1
    context.moveTo(300, 100)
    context.lineTo(300 + Math.cos(sAngle) * sLen, 100 + Math.sin(sAngle) * sLen )
    context.stroke()
    // 绘制AM/PM
    const textWidth = context.measureText(text).width
    context.fillText(text, 300 - textWidth/2, 100 - 40)
    let font = context.font
    context.font = "20px '微软雅黑'"
    context.fillText(`${cHours}:${cMinute}:${cSecond} ${text}`, 400 - textWidth/2, 20)
    context.font = font
  }
}
</script>
