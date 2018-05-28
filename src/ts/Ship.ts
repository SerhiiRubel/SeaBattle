import { Field } from "./field";

export class Ship {
  player: Field
  shipId: string;
  decks: number;
  x0: number;
  y0: number;
  kx: number;
  ky: number;
  hits: number;
  matrix;
  constructor(player, fc) {
    this.player = player;
    this.shipId = fc.shipId;
    this.decks = fc.decks;
    this.x0 = fc.x;
    this.y0 = fc.y;
    this.kx = fc.kx;
    this.ky = fc.ky;
    this.hits = 0;
    this.matrix = [];
    // console.log(this.player);    
  }

  createShip() {
    let k = 0;
    while( k < this.decks ) {
      this.player.array[ this.x0 + k * this.kx ][ this.y0 + k * this.ky ] = 1;
      this.matrix.push([this.x0 + k * this.kx, this.y0 + k * this.ky]);
      k++;     
    }
  }
}