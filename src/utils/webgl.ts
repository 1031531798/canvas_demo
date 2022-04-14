interface GlProps {
  el: string | HTMLCanvasElement,
}
export class WebGl {
  canvasDom: HTMLElement | null = null
  gl: WebGLRenderingContext | null = null
  program: WebGLShader = ''
  constructor(props: GlProps) {
    this.canvasDom = props.el instanceof HTMLCanvasElement ? props.el : document.getElementById(props.el)

  }
  initGl(): WebGLRenderingContext | null {
    if (this.canvasDom instanceof HTMLCanvasElement) {
      this.gl = this.canvasDom.getContext('webgl')
    } else {
      throw new RangeError("canvas对象不存在");
    }
    return this.gl
  }
  iniShaders(vsSource: string, fsSource: string) {
    const gl = this.gl
    if (gl) {
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
      //保存程序对象
      this.program = program;
    }
  }
}