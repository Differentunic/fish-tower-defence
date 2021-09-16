class tower {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.range = {level: 1, max:5, prices: [200, 300, 400, 500]};
      this.firerate = {level: 1, max:5, prices: [200, 300, 400, 500]};
      this.penetration = {level: 1, max:5, prices: [200, 300, 400, 500]};
    }
    draw() {
      towergraphics.fill(100, 23, 43)
      towergraphics.rect(this.x * someconstant, this.y * someconstant, someconstant, someconstant)
    }
  
    upgradedraw() {
      fill(255)
      rect(0, 40, 200, 300)
      fill(0)
      textSize(32)
      text("spear", 0, 40, 200, 32)
      fill(255)
      rect(20, 72, 160, 64)
      rect(20, 160, 160, 64)
      rect(20, 246, 160, 64)
      fill(0)
  
      textSize(16)
      text(`range, lvl ${this.range.level}, ${(this.range.level !== this.range.max) ? `upgrade ($${this.range.prices[this.range.level-1]})` : `max` }`, 20, 72, 160, 64)
      text(`firerate, lvl ${this.firerate.level}, ${(this.firerate.level !== this.firerate.max) ? `upgrade ($${this.firerate.prices[this.firerate.level-1]})` : `max` }`, 20, 160, 160, 64)
      text(`damage, lvl ${this.penetration.level}, ${(this.penetration.level !== this.range.max) ? `upgrade ($${this.penetration.prices[this.penetration.level-1]})` : `max` }`, 20, 246, 160, 64)
      
      fill(0, 0, 0, 20)
      if (mouseX > 20 && mouseX < 20+160 && mouseY > 72 && mouseY < 72+64) {
        rect(20, 72, 160, 64)
      } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 160 && mouseY < 160+64) {
        rect(20, 160, 160, 64)
      } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 246 && mouseY < 246+64) {
        rect(20, 246, 160, 64)
      }
    }
    upgrademouseClick() {
      if (mouseX > 20 && mouseX < 20+160 && mouseY > 72 && mouseY < 72+64) {
        if (this.range.level <= this.range.max+1) {
          if (money >= this.range.prices[this.range.level-1]) {
            money -= this.range.prices[this.range.level-1]
            this.range.level += 1
          }    
        }
      } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 160 && mouseY < 160+64) {
        if (this.firerate.level <= this.firerate.max+1) {
          if (money >= this.firerate.prices[this.firerate.level-1]) {
            money -= this.firerate.prices[this.firerate.level-1]
            this.firerate.level += 1
          }    
        }
      } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 246 && mouseY < 246+64) {
        if (this.penetration.level <= this.penetration.max+1) {
          if (money >= this.penetration.prices[this.penetration.level-1]) {
            money -= this.penetration.prices[this.penetration.level-1]
            this.penetration.level += 1
          }    
        }
      }
      console.log(this)
    }
}
  
class tower1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = {level: 1, max:5, prices: [200, 300, 400, 500]};
        this.firerate = {level: 1, max:5, prices: [200, 300, 400, 500]};
        this.penetration = {level: 1, max:5, prices: [200, 300, 400, 500]};
    }
    draw() {
        towergraphics.fill(23, 100, 43)
        towergraphics.rect(this.x * someconstant, this.y * someconstant, someconstant, someconstant)
    }
    upgradedraw() {
        fill(255)
        rect(0, 40, 200, 300)
        fill(0)
        textSize(32)
        text("spear", 0, 40, 200, 32)
        fill(255)
        rect(20, 72, 160, 64)
        rect(20, 160, 160, 64)
        rect(20, 246, 160, 64)
        fill(0)
    
        textSize(16)
        text(`range, lvl ${this.range.level}, ${(this.range.level !== this.range.max) ? `upgrade ($${this.range.prices[this.range.level-1]})` : `max` }`, 20, 72, 160, 64)
        text(`firerate, lvl ${this.firerate.level}, ${(this.firerate.level !== this.firerate.max) ? `upgrade ($${this.firerate.prices[this.firerate.level-1]})` : `max` }`, 20, 160, 160, 64)
        text(`damage, lvl ${this.penetration.level}, ${(this.penetration.level !== this.range.max) ? `upgrade ($${this.penetration.prices[this.penetration.level-1]})` : `max` }`, 20, 246, 160, 64)
        
        fill(0, 0, 0, 20)
        if (mouseX > 20 && mouseX < 20+160 && mouseY > 72 && mouseY < 72+64) {
          rect(20, 72, 160, 64)
        } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 160 && mouseY < 160+64) {
          rect(20, 160, 160, 64)
        } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 246 && mouseY < 246+64) {
          rect(20, 246, 160, 64)
        }
      }
      upgrademouseClick() {
        if (mouseX > 20 && mouseX < 20+160 && mouseY > 72 && mouseY < 72+64) {
          if (this.range.level <= this.range.max+1) {
            if (money >= this.range.prices[this.range.level-1]) {
              money -= this.range.prices[this.range.level-1]
              this.range.level += 1
            }    
          }
        } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 160 && mouseY < 160+64) {
          if (this.firerate.level <= this.firerate.max+1) {
            if (money >= this.firerate.prices[this.firerate.level-1]) {
              money -= this.firerate.prices[this.firerate.level-1]
              this.firerate.level += 1
            }    
          }
        } else if (mouseX > 20 && mouseX < 20+160 && mouseY > 246 && mouseY < 246+64) {
          if (this.penetration.level <= this.penetration.max+1) {
            if (money >= this.penetration.prices[this.penetration.level-1]) {
              money -= this.penetration.prices[this.penetration.level-1]
              this.penetration.level += 1
            }    
          }
        }
        console.log(this)
    }
}

function drawTowers() {
    towergraphics.clear()
    for (f in towers) {
      towers[f].draw()
    }
}

