import {add,sub} from './math.js';
import student from "./moduleCaching.js";

console.log(add(10,20));

let newstudent = new student("New Hero");
console.log(newstudent.name);
newstudent.setName("Krish");

import studentCatogory from './moduleCaching.js';

let newStudenCatogory = new studentCatogory("New SuperHero");
console.log(newStudenCatogory.name);
newStudenCatogory.setName("Batman");

