class Fish {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.speed = 10;
        this.health = 100;
        this.node = 1
    }

    move() {
        path[this]
    }


    draw() {
        enemyGraphics.fill(100, 23, 43)
        enemyGraphics.rect(this.x * someconstant, this.y * someconstant, someconstant, someconstant)
    }
}

function drawEnemies() {
    enemyGraphics.clear()
    for (f in enemies) {
        enemies[f].move()
        enemies[f].draw()
    }
}