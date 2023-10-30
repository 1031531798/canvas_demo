type PhysicsParticleType = 'rect' | 'round'
type PhysicsParticleConfig = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color?: string
  type?:PhysicsParticleType
  size?: number
  speed?: number
  originalX?: number
  originalY?: number
  recoverSpeed?: number
  mouse?: {x: number, y: number}
}
// 粒子类
class PhysicsParticle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null | undefined;
  x: number;
  y: number;
  type: PhysicsParticleType;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  speed: number;
  recoverTime: null;
  recoverSpeed: number;
  friction: number;
  mouse: {x: number, y: number} | undefined
  angle: number
  vx: number
  vy: number
  constructor(config: PhysicsParticleConfig) {
    const {canvas, ctx, x, y, type = 'rect', color = 'orange', size = 10, speed= 0.2, recoverSpeed = 2, mouse } = config
    this.canvas = canvas
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.type = type
    this.size = size;
    this.color = color;
    this.originalX = Math.floor(x);
    this.originalY = Math.floor(y);
    this.speed = speed;
    this.recoverTime = null
    this.recoverSpeed = recoverSpeed
    this.friction = 0.9
    this.mouse = mouse
    this.angle = 0
    this.vx = 0
    this.vy = 0
  }
  draw() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

  }

  update() {
    if (this.mouse) {
      const dx = this.mouse.x - this.x
      const dy = this.mouse.y - this.y
      // 计算鼠标距离粒子的距离
      const distance = dx * dx + dy * dy
      const radius = 3000
      // 离鼠标距离的比例
      const force = - radius / distance
      if (distance < radius) {
        this.angle = Math.atan2(dy, dx)
        this.vx += force * Math.cos(this.angle)
        this.vy += force * Math.sin(this.angle)
      }
    }
    this.x += (this.vx *= this.friction) + (this.originalX - this.x) * this.speed
    this.y += (this.vy *= this.friction) + (this.originalY - this.y) * this.speed
    this.draw();
  }
}

export default PhysicsParticle
