const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext("2d")

let score = 0
let lives = 3

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

const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

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

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
      const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
      bricks[c][r].x = brickX
      bricks[c][r].y = brickY
      if (bricks[c][r].status === 1) {
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBricks()
  drawBall()
  drawPaddle()
  drawScore()
  drawLives()
  collisionDetection()

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
      ballVelocityY = -ballVelocityY -1
    } else {
      console.log('>>> lives: ', lives)
      lives--
      if(!lives) {
        alert("AHA, YOU'RE DEAD!")
        document.location.reload()
      } else {
        ballX = canvas.width / 2
        ballY = canvas.height - 30
        ballVelocityX = 2
        ballVelocityY = -2
        paddleX = (canvas.width-paddleWidth) / 2
      }

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

  requestAnimationFrame(draw)
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

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2
  }
}


function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r]
      if (b.status === 1) {
        if(ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
          ballVelocityY = -ballVelocityY;
          b.status = 0
          score++
          if (score == brickRowCount * brickColumnCount) {
            alert("You've won. No more bricks left to break. Well done.")
            document.location.reload()
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText('Score: ' + score, 8, 20)
}

function drawLives() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

document.addEventListener("keydown", keyDownHandler, false)

document.addEventListener("keyup", keyUpHandler, false)

document.addEventListener('mousemove', mouseMoveHandler, false)

draw()

