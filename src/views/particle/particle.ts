type ParticleType = 'rect' | 'round'
type ParticleConfig = {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color?: string
  type?:ParticleType
  size?: number
  speed?: number
  originalX?: number
  originalY?: number
  recoverSpeed?: number
  mouse?: {x: number, y: number}
}
// 粒子类
class Particle {
  ctx: CanvasRenderingContext2D | null | undefined;
  x: number;
  y: number;
  type: ParticleType;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  speed: number;
  recoverTime: null;
  recoverSpeed: number;
  mouse: {x: number, y: number} | undefined
  constructor(config: ParticleConfig) {
    const {ctx, x, y, type = 'rect', color = 'orange', size = 10, speed= 2,
      originalX, originalY, recoverSpeed = 2, mouse } = config
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.type = type
    this.size = size;
    this.color = color;
    this.originalX = x;
    this.originalY = y;
    this.speed = speed;
    this.recoverTime = null
    this.recoverSpeed = recoverSpeed
    this.mouse = mouse
  }

  draw() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

  }

  update() {
    this.draw();
  }

  resetPosition() {
    this.x = this.originalX;
    this.y = this.originalY;
  }
  flee(mouse: MouseEvent) {
    if (distance(mouse.x, mouse.y, this.originalX, this.originalY) < 10) {
      const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;
    }else {
      if (this.x === this.originalX || this.y === this.originalY) {
        return
      }
      const angle = Math.atan2(this.y - this.originalY, this.x - this.originalX);
      this.x -= Math.cos(angle) * this.speed;
      this.y -= Math.sin(angle) * this.speed;
    }
  }
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export default Particle
