import { getRandom } from './getRandom';
import { Ship } from './Ship';

export class Field {
  x: number = 10;
  y: number = 10;
  protected ships =  [
    [''],
    [4, 'fourdeck'],
    [3, 'tripledeck'],
    [2, 'doubledeck'],
    [1, 'singledeck']
  ]; 
  public array: number[] = this.createMatrix(); 
  constructor() {}
  public createMatrix() : number[] {
    let array = [];
    for(let i = 0; i < this.x; i++) {
      array[i] = [];
      for(let j = 0; j < this.y; j++) {
        array[i][j] = 0;
      }
    }
    return array;
  }
  public randomLocationShips() {
    let decks;
    for(let i = 1; i < this.ships.length; i++) {
      decks = this.ships[i][0];
      for(let j = 0; j < i; j++) {
        let fc = this.getCoordinateDecks(decks);
        fc.decks = decks;
        fc.shipId = this.ships[i][1] + String(j + 1);
        let ship = new Ship(this, fc);
        ship.createShip(); 
      }
    }
    return decks;
  }
  public getCoordinateDecks(decks) {
    let kx : number = getRandom(), 
        ky : number = (kx === 0) ? 1 : 0;
    let x : number, y : number;
    
    if(kx === 0) {
      x = getRandom(9);
      y = getRandom(10 - decks);
    } else {
      x = getRandom(10 - decks);
      y = getRandom(9);
    }
    let results = this.checkLocationShip(x, y, kx, ky, decks);
    if (!results) return this.getCoordinateDecks(decks);
    let obj = {
      x: x,
      y: y,
      kx: kx,
      ky: ky
    }
    return obj;
  }
  checkLocationShip(x: number, y: number, kx: number, ky: number, decks: number): boolean {
    let fromX: number, toX: number, fromY: number, toY: number;
    fromX = (x == 0) ? x : x - 1;
    if (x + kx * decks == 10 && kx == 1) toX = x + kx * decks;
    else if (x + kx * decks < 10 && kx == 1) toX = x + kx * decks + 1;
    else if (x == 9 && kx == 0) toX = x + 1;
    else if (x < 9 && kx == 0) toX = x + 2;

    fromY = (y == 0) ? y : y - 1;
	  if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
	  else if (y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
	  else if (y == 9 && ky == 0) toY = y + 1;
	  else if (y < 9 && ky == 0) toY = y + 2;

    for(let i = fromX; i < toX; i++) {
      for(let j = fromY; j < toY; j++) {
        if(this.array[i][j] == 1) return false;
      }
    }
    return true;
  }
  public drawField() {
    const field = document.querySelector('.field');
    while(field.firstChild) {
      field.removeChild(field.firstChild);
    }
    
    let array = this.array;
    for(let i = 0; i < array.length; i++) {
      for(let j = 0; j < array.length; j++) {
        let div = document.createElement('div');
        if(array[i][j] === 1) {
          div.className = "ship"
        } else {
          div.className = "sea";
        }
        field.appendChild(div);
        div.classList.add('cell');
      }
    }
  }
}