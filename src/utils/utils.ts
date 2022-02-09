
export type locationType = {
  x: number,
  y: number
}
export function view() {
  const w = window;
  const d = document && document.documentElement;
  const b = document && document.getElementsByTagName("body")[0];
  const x = w.innerWidth || d.clientWidth || b.clientWidth;
  const y = w.innerHeight || d.clientHeight || b.clientHeight;
  return {width: x, height: y};
}

export function windowToCanvas (canvas: HTMLCanvasElement, x: number, y: number): locationType {
  const box = canvas.getBoundingClientRect()
  return {
    x: x - box.left * (canvas.width / box.width) as number,
    y: y - box.top * (canvas.height / box.height as number)
  }
}
