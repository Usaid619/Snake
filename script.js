// Declaring Html Variables
const arena = document.querySelector(".arena")
const instructionText = document.querySelector(".instruction-text")
const scoreText = document.querySelector(".score")
const highScoreText = document.querySelector(".high-score")

// Defining Game Variables
let gridSize = 30
let snakePosition = [{x:15,y:15}]
let foodPosition = generateFood()
let direction = "right"
let gameInterval
let gameSpeedDelay = 200
let gameStarted = false
let score = 0
let highScore = parseInt(localStorage.getItem("highScore")) || 0
updateHighScore()

// Start the Game
function draw(){
    drawSnake(snakePosition)
    drawFood()
    updateScore()
    updateHighScore()
}

// Draw Snake
function drawSnake(snakePos){
    arena.innerHTML = ""
    if(gameStarted){
         snakePos.forEach(elem=>{
    const snakeBody = createGameElement("div","snake")

    setPosition(snakeBody,elem)
    arena.appendChild(snakeBody)
    })
    }
}

// Create Game Element
function createGameElement(tag,className){
    const gameFragment = document.createElement(tag)
    gameFragment.className = className
    return gameFragment
}

// Set Snake Position
function setPosition(element,position){
    element.style.gridColumnStart = position.x
    element.style.gridRowStart = position.y
}

// Draw Food
function drawFood(){     
    if(gameStarted){
       const food = createGameElement("div","food")
    setPosition(food,foodPosition)
    arena.appendChild(food) 
    }
}

// Generate Food
function generateFood(){
    let x = ~~(Math.random()*gridSize) + 1
    let y = ~~(Math.random()*gridSize) + 1
    
    for(let i = 1 ; i < snakePosition.length; i++){
        if(x === snakePosition[i].x && y === snakePosition[i].y){
        return generateFood()
        } 
    }
    return {x,y}
}

// Move Snake
function move(){
    
    const head = {...snakePosition[0]}

    switch(direction){
        case "up":
        head.y--
        break
        case "down":
        head.y++
        break
        case "left":
        head.x--
        break
        case "right":
        head.x++
        break
    }

    snakePosition.unshift(head)
    draw()

    if(head.x === foodPosition.x && head.y === foodPosition.y){
        score++
        updateHighScore()
        foodPosition = generateFood()
        increaseSpeed()
        clearInterval(gameInterval)
        gameInterval = setInterval(()=>{
            move()
            checkCollision()
            draw()
        },gameSpeedDelay)
    } else{
        snakePosition.pop() 
    }
}

// Start Game Function
function startGame(){
    gameStarted = true
    instructionText.style.display = "none"
    
    gameInterval = setInterval(()=>{
        move()
        draw()
        checkCollision()
    },gameSpeedDelay)
}

// Add kbd controls
function handleKeyboardEvents(e){
if((!gameStarted && e.key === " ") || (!gameStarted && e.code === "Space")){
    return startGame()
   } 
   
   if(snakePosition.length > 1){
    switch(e.key){
        case "ArrowUp":
            if(direction !== "down"){
                direction = "up"
            }
        break
        case "ArrowDown":
            if(direction !== "up"){
                direction = "down"
            }
        break
        case "ArrowLeft":
            if(direction !== "right"){
                direction = "left"
            }
        break
        case "ArrowRight":
            if(direction !== "left"){
                direction = "right"
            }
        break
    }
   } else{
    switch(e.key){
        case "ArrowUp":
        direction = "up"
        break
        case "ArrowDown":
        direction = "down"
        break
        case "ArrowLeft":
        direction = "left"
        break
        case "ArrowRight":
        direction = "right"
        break
    }
   }
}

// Handle Key Presses
document.addEventListener("keydown",handleKeyboardEvents)

// Increase Speed
function increaseSpeed(){
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5
    } else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3
    } else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2
    } else if(gameSpeedDelay > 20){
        gameSpeedDelay -= 1
    }
}

// Check Collision
function checkCollision(){
    const head = snakePosition[0]
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame()
    }

    for(let i = 1 ; i < snakePosition.length; i++){
        if(head.x === snakePosition[i].x && head.y === snakePosition[i].y){
            resetGame()
        }
    }
}

// Reset Game
function resetGame(){
    updateHighScore()
    stopGame()
    snakePosition = [{x:15,y:15}]
    foodPosition = generateFood()
    direction = "right" 
    gameSpeedDelay = 200
    score = 0
}

// Update Score
function updateScore(){
scoreText.textContent = `Score: ${score.toString().padStart(3,"0")}`
}

// Update High Score
function updateHighScore(){
 if(score > highScore){
    highScore = score  
}

localStorage.setItem("highScore",highScore)

 highScoreText.textContent = `High Score: ${highScore.toString().padStart(3,"0")}`
}

// Stop Game
function stopGame(){
clearInterval(gameInterval)
gameStarted = false
instructionText.style.display = "block"
}

// Update High Score On Opening
updateHighScore()