import './scss/main.css';
import { Field } from './ts/field';

let field = new Field;
let btn = document.querySelector('.generate');

field.createMatrix();
field.randomLocationShips();
field.drawField();