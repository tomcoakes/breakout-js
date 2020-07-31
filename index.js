const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext("2d")

let ballX = canvas.width / 2
let ballY = canvas.height - 30

let ballVelocityX = 2
let ballVelocityY = -2

let rightPressed = false
let leftPressed = false

const ballRadius = 10
let ballColour = "#0095DD"

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function randomiseBallColour() {
  ballColour = `rgb(${getRandomInt(0, 256)}, ${getRandomInt(0, 256)}, ${getRandomInt(0, 256)})`
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = ballColour
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = 'orange'
  ctx.fill()
  ctx.closePath()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  drawPaddle()

  ballX += ballVelocityX
  ballY += ballVelocityY

  if (ballX + ballVelocityX < ballRadius || ballX + ballVelocityX > canvas.width - ballRadius) {
    ballVelocityX = -ballVelocityX
    randomiseBallColour()
  }

  if (ballY + ballVelocityY < ballRadius) {
    ballVelocityY = -ballVelocityY
    randomiseBallColour()
  } else if(ballY + ballVelocityY > canvas.height - ballRadius) {
    if(ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballVelocityY = -ballVelocityY
    } else {
      alert("AHA, YOU'RE DEAD!")
      document.location.reload()
      clearInterval(interval)
    }
  }

  if(rightPressed) {
    paddleX += 7
    if (paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth
    }
  }

  if(leftPressed) {
    paddleX -= 7
    if (paddleX < 0){
      paddleX = 0
    }
  }
}

function keyDownHandler(event) {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = true
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = true
  }
}

function keyUpHandler(event) {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false
  }
}

document.addEventListener("keydown", keyDownHandler, false)

document.addEventListener("keyup", keyUpHandler, false)

let interval = setInterval(draw, 10)

