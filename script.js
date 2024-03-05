// Declaring Html Variables
const arena = document.querySelector(".arena")

// Defining Snake's Initial Position
let gridSize = 40
let snakePosition = [{x:20,y:20}]
let foodPosition = generateFood()
let direction = "right"

// Start the Game
function draw(){
    drawSnake(snakePosition)
    drawFood()
}

// Draw Snake
function drawSnake(snakePos){
    arena.innerHTML = ""
    snakePos.forEach(elem=>{
    const snakeBody = createGameElement("div","snake")

    setPosition(snakeBody,elem)
    arena.appendChild(snakeBody)
    })
    
}

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
    const food = createGameElement("div","food")
    setPosition(food,foodPosition)
    arena.appendChild(food)
}

// Generate Food
function generateFood(){
    console.log("fooooooood")
    let x = ~~(Math.random()*gridSize) + 1
    let y = ~~(Math.random()*gridSize) + 1
    
    return {x,y}
}

// Moving Snake
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
    snakePosition.pop() 
    draw()
}

document.addEventListener("keydown",(e)=>{
    
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
})

setInterval(move,60)
draw()