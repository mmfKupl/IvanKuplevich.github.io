var canvas = document.getElementById("canvas");
var W = 333;
var H = 200;
setDim();
var ctx = canvas.getContext("2d");
var padding = 2.5;
var menuH = 40;

ctx.strokeStyle = "#000";
ctx.lineWidth = 2;
ctx.strokeRect(padding, H - menuH - padding, W - 2 * padding, menuH);

// window.addEventListener("resize", e => {
//   var w = window.screen.availWidth;
//   // if (w)
// });

function setDim() {
  canvas.width = W;
  canvas.height = H;
}

// function render
//<link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
