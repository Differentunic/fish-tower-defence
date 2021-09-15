let towers = {}
let towergraphics
let someconstant 

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  console.log("bruh")
  towergraphics = createGraphics(windowWidth, windowHeight)
  if (windowWidth-300 % 9 > windowHeight & 5) {someconstant = (windowWidth-300)/9} else {someconstant = windowHeight / 5}
  console.log(someconstant)
}

function windowResized() {
  resizeCanvas (windowWidth, windowHeight)
  towergraphics = createGraphics(windowWidth, windowHeight)
  towergraphics.clear()
  for (f in towers) {
    towers[f].draw()
  }
}

function draw() {
  background(0)
  noFill()
  image(towergraphics, 0, 0)
  stroke(100)
  if (mouseX < 9*someconstant && mouseY < 5*someconstant) {
    rect ((floor(mouseX / someconstant) * someconstant),
    (floor(mouseY / someconstant) * someconstant), someconstant, someconstant)  
  }
}


function mouseClicked() {
  if (mouseX < 9 * someconstant && mouseY < 5 * someconstant) {
    let x = floor(mouseX/someconstant)
    let y =  floor(mouseY/someconstant)
    
    if (!([x, y] in towers)) {
      towers[[x, y]] = new tower(x, y)
    }
  }
  towergraphics.clear()
  for (f in towers) {
    towers[f].draw()
  }
}

class tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    towergraphics.fill(100, 23, 43)
    towergraphics.rect(this.x * someconstant, this.y * someconstant, someconstant, someconstant)
  }
}