export function view() {
  var w = window;
  var d = document && document.documentElement;
  var b = document && document.getElementsByTagName("body")[0];
  var x = w.innerWidth || d.clientWidth || b.clientWidth;
  var y = w.innerHeight || d.clientHeight || b.clientHeight;
  return {width: x, height: y};
}