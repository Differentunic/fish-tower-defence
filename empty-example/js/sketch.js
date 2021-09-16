let towers = {}
let enemies = {}
let towerGraphics
let enemyGraphics
let backgroundGraphics
let towerBuyGraphics
let someConstant

// gui vars
let gui
let btnSpear
let btnNet

let selectedBuyTower = false
let selected = false

let money = 100000

// tower sprites are loading into these variables
let imgSpear
let imgNet

//the tileimages will be loaded into these
let empty, h, v, lt, lb, rt, rb
let backgroundLayout = [
    ["e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "rb", "h", "h", "h", "h", "lb", "e", "e"],
    ["e", "rt", "h", "lb", "e", "e", "v", "e", "e"],
    ["e", "e", "e", "v", "e", "e", "v", "e", "e"],
    ["e", "e", "e", "v", "e", "e", "v", "e", "e"]
]

let path = [[6, 4], [6, 1], [1, 1], [1, 2], [3, 2], [3, 4]]

//loading the images
function preload() {
    fontBitcraft = loadFont('assets/fonts/bitcraft/Bitcraft.ttf')

    // tiles
    empty = loadImage('img/tiles/tile-e.png')
    h = loadImage('img/tiles/tile-h.png')
    v = loadImage('img/tiles/tile-v.png')
    lt = loadImage('img/tiles/tile-lt.png')
    lb = loadImage('img/tiles/tile-lb.png')
    rt = loadImage('img/tiles/tile-rt.png')
    rb = loadImage('img/tiles/tile-rb.png')

    // tower sprites
    imgSpear = loadImage('img/towers/spear.png')
    imgNet = loadImage('img/towers/net.png')
}


let tilemapWidth = 9
let tilemapHeight = 5

let rightSpace = 100

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(0)

    towerGraphics = createGraphics(windowWidth, windowHeight)
    enemyGraphics = createGraphics(windowWidth, windowHeight)
    backgroundGraphics = createGraphics(windowWidth - rightSpace, windowHeight)
    towerBuyGraphics = createGraphics(rightSpace, windowHeight)

    if (windowWidth - rightSpace % tilemapWidth > windowHeight & tilemapHeight) {
        someConstant = (windowWidth - rightSpace) / tilemapWidth
    } else {
        someConstant = windowHeight / tilemapHeight
    }

    drawBackground()
    drawTowers() //there probably isn't any towers but idk

    // old tower buy gui
    /*
    towerBuyGraphics.background(255)
    towerBuyGraphics.rect(10, 40, towerBuyGraphics.width - 20, 80)
    towerBuyGraphics.rect(10, 40 + towerBuyGraphics.width, towerBuyGraphics.width - 20, 80)
    towerBuyGraphics.rect(10, 40 + towerBuyGraphics.width * 2, towerBuyGraphics.width - 20, 80)
     */

    // gui setup
    gui = createGui();
    btnSpear = createButton("", 10 + windowWidth - rightSpace, 40, towerBuyGraphics.width - 20, 80);
    btnNet = createButton("", 10 + windowWidth - rightSpace, 160, towerBuyGraphics.width - 20, 80)
}

function windowResized() {
    if (windowWidth - rightSpace % tilemapWidth > windowHeight & tilemapHeight) {
        someConstant = (windowWidth - rightSpace) / tilemapWidth
    } else {
        someConstant = windowHeight / tilemapHeight
    }

    // handing tower graphics on window resize
    resizeCanvas(windowWidth, windowHeight)
    towerGraphics.clear()
    towerGraphics = createGraphics(windowWidth, windowHeight)
    drawTowers()

    // handling tower graphics on window resize
    enemyGraphics.clear()
    enemyGraphics = createGraphics(windowWidth, windowHeight)
    drawEnemies()

    // handling tower graphics on window resize
    backgroundGraphics.clear()
    backgroundGraphics = createGraphics(windowWidth, windowHeight)
    drawBackground()
}

function draw() {

    for (let i of path) {
        rect(i[0] * someConstant, i[1] * someConstant, someConstant, someConstant)
    }

    background(0)

    image(backgroundGraphics, 0, 0)
    image(towerGraphics, 0, 0)
    image(towerBuyGraphics, windowWidth - rightSpace, 0)
    fill(0)

    // testing custom font (Bitcraft)
    textFont(fontBitcraft)
    textSize(32)
    text(`$${money}`, windowWidth - 120 - textWidth(money), 0, 32, 32)

    noFill()
    stroke(100)

    if (mouseX < tilemapWidth * someConstant && mouseY < tilemapHeight * someConstant) {
        rect((floor(mouseX / someConstant) * someConstant),
            (floor(mouseY / someConstant) * someConstant), someConstant, someConstant)
    }
    // old gui
    /*
    else {
        drawselectbuytower()
    }


    if (selectedBuyTower !== false) {
        noFill()
        stroke(255, 0, 0)
        rect(windowWidth - rightSpace + 10, 40 + towerBuyGraphics.width * selectedBuyTower, towerBuyGraphics.width - 20, 80)
        console.log(windowWidth - rightSpace + 10, 40 + towerBuyGraphics.width * selectedBuyTower, towerBuyGraphics.width - 20, 80)
    }
    stroke(100)
     */

    if (selected !== false) {
        towers[selected].upgradedraw()
    }

    // gui stuff below
    // spear tower
    btnSpear.x = 10 + windowWidth - rightSpace
    btnSpear.y = 40
    btnSpear.w = towerBuyGraphics.width - 20
    btnSpear.h = 80

    // net tower
    btnNet.x = 10 + windowWidth - rightSpace
    btnNet.y = 160
    btnNet.w = towerBuyGraphics.width - 20
    btnNet.h = 80

    // draw/update the gui
    drawGui();

    // tower icons are ontop of the buttons
    image(imgSpear, 20 + windowWidth - rightSpace, 50, (towerBuyGraphics.width - 20) * 0.8)
    image(imgNet, 20 + windowWidth - rightSpace, 170, (towerBuyGraphics.width - 20) * 0.8)
}


function mouseClicked() {
    let x = floor(mouseX / someConstant)
    let y = floor(mouseY / someConstant)


    if (selected !== false && !(mouseX > 0 && mouseX < 200 && mouseY > 40 && mouseY < 340)) {
        selected = false
    }
    if (selected !== false) {
        towers[selected].upgrademouseClick()
    }

    if (x < tilemapWidth && y < tilemapHeight) {

        if (backgroundLayout[y][x] == "e") {
            if (!([x, y] in towers)) {
                if (selectedBuyTower !== false) {
                    switch (selectedBuyTower) {
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
            } else {
                selected = [x, y]
            }
        }

        selectedBuyTower = false

    } else {
        fnselectbuytower()
    }
    drawTowers()
}

/*
function drawselectbuytower() {
    let x = mouseX - windowWidth + rightSpace
    // console.log(x)
    if (x > 10 && x < towerBuyGraphics.width - 20) {
        if (mouseY > 40 && mouseY < 40 + towerBuyGraphics.width - 20) {
            fill(25, 25, 25, 100)
            rect(windowWidth - rightSpace + 10, 40, towerBuyGraphics.width - 20, 80)
        } else if (mouseY > 40 + towerBuyGraphics.width && mouseY < 40 + towerBuyGraphics.width * 2 - 20) {
            fill(25, 25, 25, 100)
            rect(windowWidth - rightSpace + 10, 40 + towerBuyGraphics.width, towerBuyGraphics.width - 20, 80)
        } else if (mouseY > 40 + towerBuyGraphics.width * 2 && mouseY < 40 + towerBuyGraphics.width * 3 - 20) {
            fill(25, 25, 25, 100)
            rect(windowWidth - rightSpace + 10, 40 + towerBuyGraphics.width * 2, towerBuyGraphics.width - 20, 80)
        }
    }
}
 */

function fnselectbuytower() {
    let x = mouseX - windowWidth + rightSpace
    // console.log(x)
    if (x > 10 && x < towerBuyGraphics.width - 20) {
        if (mouseY > 40 && mouseY < 40 + towerBuyGraphics.width - 20) {
            selectedBuyTower = 0
        } else if (mouseY > 40 + towerBuyGraphics.width && mouseY < 40 + towerBuyGraphics.width * 2 - 20) {
            selectedBuyTower = 1
        } else if (mouseY > 40 + towerBuyGraphics.width * 2 && mouseY < 40 + towerBuyGraphics.width * 3 - 20) {
            selectedBuyTower = 2
        }
    }
}

function drawBackground() {
    for (iy in backgroundLayout) {
        for (ix in backgroundLayout[iy]) {
            let wx = ix * someConstant
            let wy = iy * someConstant
            switch (backgroundLayout[iy][ix]) {
                case "e":
                    backgroundGraphics.image(empty, wx, wy, someConstant, someConstant)
                    break;
                case "v":
                    backgroundGraphics.image(v, wx, wy, someConstant, someConstant)
                    break;
                case "h":
                    backgroundGraphics.image(h, wx, wy, someConstant, someConstant)
                    break;
                case "lb":
                    backgroundGraphics.image(lb, wx, wy, someConstant, someConstant)
                    break;
                case "lt":
                    backgroundGraphics.image(lt, wx, wy, someConstant, someConstant)
                    break;
                case "rb":
                    backgroundGraphics.image(rb, wx, wy, someConstant, someConstant)
                    break;
                case "rt":
                    backgroundGraphics.image(rt, wx, wy, someConstant, someConstant)
                    break;
            }
        }
    }
}


