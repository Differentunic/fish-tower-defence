let towers = {}
let towergraphics
let backgroundgraphics
let towerbuygraphics
let someconstant 

let selectedbuytower = false
let selected = false

let money = 100000


//the tileimages will be loaded into these
let empty, lr, tb, lt, lb, rt, rb 
let backgroundlayout = [
  ["e","e","e","e","e","e","e","e","e"],
  ["e","rb","lr","lr","lr","lr","lb","e","e"],
  ["e","rt","lr","lb","e","e","tb","e","e"],
  ["e","e","e","tb","e","e","tb","e","e"],
  ["e","e","e","tb","e","e","tb","e","e"]
]

  

//loading the images
function preload() {
  empty = loadImage('tiles/Tile---Empty.png')
  lr = loadImage('tiles/Tile---Straight-lr.png')
  tb = loadImage('tiles/Tile---Straight-tb.png')
  lt = loadImage('tiles/Tile---Turn-lt.png')
  lb = loadImage('tiles/Tile---Turn-lb.png')
  rt = loadImage('tiles/Tile---Turn-rt.png')
  rb = loadImage('tiles/Tile---Turn-rb.png')
}


let tilemapwidth = 9
let tilemapheight = 5

let rightspace = 100

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  
  towergraphics = createGraphics(windowWidth, windowHeight)
  backgroundgraphics = createGraphics(windowWidth-rightspace, windowHeight)
  towerbuygraphics = createGraphics(rightspace, windowHeight)

  if (windowWidth-rightspace % tilemapwidth > windowHeight & tilemapheight) {someconstant = (windowWidth-rightspace)/tilemapwidth} else {someconstant = windowHeight / tilemapheight}
  
  drawBackground()
  drawTowers() //there probably isn't any towers but idk
  

  towerbuygraphics.background(255)
  towerbuygraphics.rect(10, 40, towerbuygraphics.width-20, 80)
  towerbuygraphics.rect(10, 40+towerbuygraphics.width, towerbuygraphics.width-20, 80)
  towerbuygraphics.rect(10, 40+towerbuygraphics.width*2, towerbuygraphics.width-20, 80)
}

function windowResized() {
  if (windowWidth-rightspace % tilemapwidth > windowHeight & tilemapheight) {someconstant = (windowWidth-rightspace)/tilemapwidth} else {someconstant = windowHeight / tilemapheight}

  resizeCanvas (windowWidth, windowHeight)
  towergraphics.clear()
  towergraphics = createGraphics(windowWidth, windowHeight)
  drawTowers()
  backgroundgraphics.clear()
  backgroundGraphics = createGraphics(windowWidth, windowHeight)
  drawBackground()
}

function draw() {
  background(0)

  image(backgroundgraphics, 0, 0)
  image(towergraphics, 0, 0)
  image(towerbuygraphics, windowWidth-rightspace, 0)
  fill(0)
  textSize(32)
  text(`$${money}`, windowWidth-120-textWidth(money), 0, 32, 32)

  noFill()
  stroke(100)
  
  if (mouseX < tilemapwidth*someconstant && mouseY < tilemapheight*someconstant) {
    rect ((floor(mouseX / someconstant) * someconstant),
    (floor(mouseY / someconstant) * someconstant), someconstant, someconstant)
  } else {
    drawselectbuytower()
  }

  if (selectedbuytower !== false) {
    noFill()
    stroke(255, 0, 0)
    rect(windowWidth-rightspace+10, 40+towerbuygraphics.width*selectedbuytower, towerbuygraphics.width-20, 80)
  }
  stroke(100)



  if (selected !== false) {
    towers[selected].upgradedraw()
  }

}


function mouseClicked() {
  let x = floor(mouseX / someconstant)
  let y = floor(mouseY / someconstant)
  

  if (selected !== false && !(mouseX > 0 && mouseX < 200 && mouseY > 40 && mouseY < 340)) {
    selected = false
  }
  if (selected !== false) {
    towers[selected].upgrademouseClick()
  }

  if (x < tilemapwidth && y < tilemapheight) {

    if (backgroundlayout[y][x] == "e") {
      if (!([x, y] in towers)) {
        if (selectedbuytower !== false) {
          switch (selectedbuytower) {
            case 0:
              towers[[x, y]] = new tower(x, y)
            break;
            case 1:
              towers[[x, y]] = new tower1(x, y)
            break;
            case 2:
              towers[[x, y]] = new tower(x, y)
            break;
          }
        }
      }
      else {
        selected = [x, y]
      }
    }

    selectedbuytower = false

  } else {
    fnselectbuytower()
  }
  drawTowers()
}



function drawselectbuytower() {
  let x = mouseX - windowWidth + rightspace
  // console.log(x)
  if (x > 10 && x < towerbuygraphics.width-20) {
    if (mouseY > 40 && mouseY < 40+towerbuygraphics.width-20) {
      fill(25, 25, 25, 100)
      rect(windowWidth-rightspace + 10, 40, towerbuygraphics.width-20, 80)
    } else if (mouseY > 40+towerbuygraphics.width && mouseY < 40+towerbuygraphics.width*2-20) {
      fill(25, 25, 25, 100)
      rect(windowWidth-rightspace + 10, 40+towerbuygraphics.width, towerbuygraphics.width-20, 80)
    } else if (mouseY > 40+towerbuygraphics.width*2 && mouseY < 40+towerbuygraphics.width*3-20) {
      fill(25, 25, 25, 100)
      rect(windowWidth-rightspace + 10, 40+towerbuygraphics.width*2, towerbuygraphics.width-20, 80)
    }
  }
}

function fnselectbuytower() {
  let x = mouseX - windowWidth + rightspace
    // console.log(x)
    if (x > 10 && x < towerbuygraphics.width-20) {
      if (mouseY > 40 && mouseY < 40+towerbuygraphics.width-20) {
        selectedbuytower = 0
      } else if (mouseY > 40+towerbuygraphics.width && mouseY < 40+towerbuygraphics.width*2-20) {
        selectedbuytower = 1
      } else if (mouseY > 40+towerbuygraphics.width*2 && mouseY < 40+towerbuygraphics.width*3-20) {
        selectedbuytower = 2
      }
    }
}

function drawBackground() {
  for (iy in backgroundlayout) {
    for (ix in backgroundlayout[iy]) {
      let wx = ix * someconstant
      let wy = iy * someconstant
      switch (backgroundlayout[iy][ix]) {
        case "e":
          backgroundgraphics.image(empty, wx, wy, someconstant, someconstant)
        break;
        case "tb":
          backgroundgraphics.image(tb, wx, wy, someconstant, someconstant)
        break;
        case "lr":
          backgroundgraphics.image(lr, wx, wy, someconstant, someconstant)
        break;
        case "lb":
          backgroundgraphics.image(lb, wx, wy, someconstant, someconstant)
        break;
        case "lt":
          backgroundgraphics.image(lt, wx, wy, someconstant, someconstant)
        break;
        case "rb":
          backgroundgraphics.image(rb, wx, wy, someconstant, someconstant)
        break;
        case "rt":
          backgroundgraphics.image(rt, wx, wy, someconstant, someconstant)
        break;
      }
    } 
  }
}


