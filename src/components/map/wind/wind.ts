import * as d3 from "d3"
import * as mapboxGl from 'mapbox-gl';
import {view} from '@/utils/utils'
const colorStyles = [
  "rgba(85, 85, 85, 1)",
  "rgba(95, 95, 95, 1)",
  "rgba(105, 105, 105, 1)",
  "rgba(115, 115, 115, 1)",
  "rgba(125, 125, 125, 1)",
  "rgba(135, 135, 135, 1)",
  "rgba(145, 145, 145, 1)",
  "rgba(155, 155, 155, 1)",
  "rgba(165, 165, 165, 1)",
  "rgba(175, 175, 175, 1)",
  "rgba(185, 185, 185, 1)",
  "rgba(195, 195, 195, 1)",
  "rgba(205, 205, 205, 1)",
  "rgba(215, 215, 215, 1)",
  "rgba(225, 225, 225, 1)",
  "rgba(235, 235, 235, 1)",
  "rgba(245, 245, 245, 1)",
  "rgba(255, 255, 255, 1)"
]
const lineData = [
  {
    x: 10.5,
    y: 20.5,
    xt: 20.5,
    yt: 30.5,
    color: 'rgba(245, 98, 72, 1)',
    level: 3
  }
]
// 大风动画参数
class WindConfig {
  public SECOND = 1000;
  public MINUTE = 60 * this.SECOND;
  public HOUR = 60 * this.MINUTE;
  public MAX_TASK_TIME = 100;                  // amount of time before a task yields control (millis)任务产生控制所需的时间
  public MIN_SLEEP_TIME = 25;                  // amount of time a task waits before resuming (millis)任务在恢复之前等待的时间
  public MIN_MOVE = 4;                         // slack before a drag operation beings (pixels)
  public MOVE_END_WAIT = 1000;                 // time to wait for a move operation to be considered done (millis)等待移动操作完成的时间

  public OVERLAY_ALPHA = Math.floor(0.4*255);  // overlay transparency (on scale [0, 255]) 覆盖透明度(按比例)
  public INTENSITY_SCALE_STEP = 10;            // step size of particle intensity color scale 粒子强度颜色尺度的步长
  public MAX_PARTICLE_AGE = 100;               // max number of frames a particle is drawn before regeneration 一个粒子在再生之前绘制的最大帧数
  public PARTICLE_LINE_WIDTH = 1.0;            // line width of a drawn particle 绘制粒子的线宽
  public PARTICLE_MULTIPLIER = 7;              // particle count scalar (completely arbitrary--this values looks nice) 粒子数标量(完全任意——这个值看起来不错)  
  public PARTICLE_REDUCTION = 0.75;            // reduce particle count to this much of normal for mobile devices 粒子计数标量(
  public FRAME_RATE = 60;                      // desired milliseconds per frame 每帧所需毫秒数

  public NULL_WIND_VECTOR = [NaN, NaN, null];  // singleton for undefined location outside the vector field [u, v, mag] 单例用于向量字段外未定义的位置
  public HOLE_VECTOR = [NaN, NaN, null];       // singleton that signifies a hole in the vector field 单例，表示向量字段中的一个洞
  public TRANSPARENT_BLACK = [0, 0, 0, 0];     // singleton 0 rgba 单列 颜色值
  // 进度条符号
  public REMAINING = "▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫";   // glyphs for remaining progress bar
  public COMPLETED = "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪";   // glyphs for completed progress bar
}

class Wind {
  overlayCtx: CanvasRenderingContext2D | null
  animationCtx: CanvasRenderingContext2D | null
  windConfig: WindConfig
  map: mapboxGl.Map
  animate: any
  constructor (map: mapboxGl.Map) {
    this.overlayCtx = null
    this.animationCtx = null
    this.windConfig = new WindConfig()
    this.map = map
  }
  init () {
    const overlay: d3.BaseType | HTMLCanvasElement = d3.select("#overlay").node()
    const animation: d3.BaseType | HTMLCanvasElement = d3.select("#animation").node()
    // 创建大风动画画布
    if (animation instanceof HTMLCanvasElement) {
      this.animationCtx = animation.getContext('2d') as CanvasRenderingContext2D
      this.animationCtx.lineWidth = this.windConfig.PARTICLE_LINE_WIDTH;
    }
    // 设置画布大小 （解决线条太粗 不能用百分比来设置画布大小）
    const width = view().width
    const height = view().height
    d3.selectAll('.fill-screen').attr("width", width).attr("height", height)
    // 创建大风底部填充画布
    if (overlay instanceof HTMLCanvasElement) {
      this.overlayCtx = overlay.getContext('2d')
    }
    return this
  }
  drawWind () {
    setInterval(() => {
      this.animateLine()
    }, this.windConfig.FRAME_RATE)
  }

  animateLine () {
    if (this.animationCtx) {
      // const windData = require('@/data/windData.json')
      const prev = this.animationCtx.globalCompositeOperation;
      this.animationCtx.globalCompositeOperation = "destination-in";
      this.animationCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      this.animationCtx.fillRect(0, 0, 1563, 495);
      this.animationCtx.globalCompositeOperation = prev;
      lineData.forEach(line => {
      if (this.animationCtx) {
        this.animationCtx.beginPath()
        this.animationCtx.fillStyle = line.color
        this.animationCtx.moveTo(line.x, line.y);
        this.animationCtx.lineTo(line.xt, line.yt);
        this.animationCtx.stroke();
        if (line.x < 100) {
          line.x++
          line.y++
          line.xt++
          line.yt++
        }else {
          line.x = 10
          line.y = 20
          line.xt = 20
          line.yt = 30
        }
      }
    })
      const geojson:any = {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "point",
            "coordinates": [
              [122.23337794444444, 29.973452527777777],
            ]
          }
        }
      };
      this.map.on('style.load', () => {
      })
    }
  }

  
  
}

export default Wind