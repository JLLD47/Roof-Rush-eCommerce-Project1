// Creacion de la clase para las plataformas
class Platforms {
  constructor() {
    this.width = 400
    this.height = 200
    this.x = 1280 - this.width;
    this.y = 600 - this.height;
    this.directionX = -1; // Izquierda por default
    this.speed = 6;
    this.sprite = document.createElement("div");
    this.interval = setInterval(this.move.bind(this), refreshRate);
  }
  insert() {
    this.sprite.setAttribute("class", "platform");
    this.sprite.style.width = this.width + "px";
    this.sprite.style.height = this.height + "px";
    this.sprite.style.top = this.y + "px";
    this.sprite.style.left = this.x + "px";
    playField.appendChild(this.sprite);
  }
  remove() {   
    playField.removeChild(this.sprite);
    clearInterval(this.interval); 
  }
  move() {
    let newX = this.x + this.speed * this.directionX;
    if (newX + this.width > 0) {
      this.x = newX;
      this.sprite.style.left = this.x + "px";
    } else {

      platforms.shift()
      this.remove();
    
    }
  }
  overlap(platformsArray) {
    for (let platform of platformsArray) {
      if (
        this.x < platform.x + platform.width &&
        this.x + this.width > platform.x
      ) {
        return true;
      }
    }
    return false; 
  }
}
