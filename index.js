const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30

let dx = 2
let dy = -2

const ballRadius = 10
let ballColour = "#0095DD"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = ballColour
  ctx.fill()
  ctx.closePath()
}

function randomiseBallColour() {
  ballColour = `rgb(${getRandomInt(0, 256)}, ${getRandomInt(0, 256)}, ${getRandomInt(0, 256)})`
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()

  x += dx
  y += dy

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx
    randomiseBallColour()
  }

  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
    dy = -dy
    randomiseBallColour()
  }
}

setInterval(draw, 10)

