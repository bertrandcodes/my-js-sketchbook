let i = 3;
do {
  i--;
  console.log("doing:", i);
} while (i > 0);

// parts of loops can be omitted: for(;;) actually works

console.log(false == 0, "should be true because of coercion?");

// transpilers convert code to older JavaScript code that older JavaScript engines can read
// polyfills fills in when there is a lack of implementation for things like newer functions (like Math.trunc)

let user = new Object();
user["with space"] = "it worked";

console.log(user, "wow you can make an object this way {} and use space");

let variable = "variable";

let bag = {
  [variable]: 5,
};

console.log(bag, bag[variable]);

// there are no limitations on property names. you can use return, like obj.return.

// integer property means a string can be turned to an integer then back, like "42". "+49" is not integer property.
// integer property keys get sorted in an obj automatically. other keys don't.

const sortedObj = {
  3: "",
  2: "",
  "don't sort": "",
  1: "",
};

for (const key in sortedObj) {
  console.log(key, "key");
}

const obj1 = {
  name: "Bert",
  color: "blue",
  obj: {},
};

const obj2 = {
  name: "Jobert",
  shirtSize: "M",
};

console.log(Object.assign(obj1, obj2), "Object.assign...");

const clone = Object.assign({}, obj1);
console.log(clone.obj == obj1.obj, "is clone equal?");

const structuredCloneObj = structuredClone(obj1); // deeper cloner

console.log(structuredCloneObj.obj == obj1.obj, "is clone equal?");

// however structedClone does not clone functions

obj1.reflect = obj1;
console.log(obj1 == obj1.reflect, "circular?");

// garbage collector is a background process in the JavaScript engine that monitors all objects and removes those that have become unreachable

let thisUser = {
  firstName: "Ilya",
  // sayHi() {
  //   let arrow = () => alert(this.firstName);
  //   arrow();
  // },
  sayHi: () => {
    console.log(this.firstName, "try to say first name");
  },
};

thisUser.sayHi();

let thisNewUser = {
  firstName: "Todd",
};

thisNewUser.sayHi = thisUser.sayHi;

thisNewUser.sayHi(); // undefined if sayHi is in an arrow function. This is because arrow functions ignore the rules of "this" bindings. With a regular function, the function is implicitly bound to what calls it. But arrow functions get the this context from the lexical scope of where it is defined. sayHi is defined in the global scope, so the this keyword becomes the global object.

const $button = document.getElementById("button");
const $button2 = document.getElementById("button2");

$button.addEventListener("click", () => {
  console.log(this, "what is this 1");
});

$button2.addEventListener("click", function () {
  console.log(this, "what is this 2");
});

const regObj = {
  runMethod: function (fn) {
    fn();
  },
};

regObj.runMethod(function () {
  console.log(
    this,
    "what is this here? if regObj, then addEventListener is not special..."
  );
});

// This is cool. addEventListener is special because it is built to bind "this" within the passed in function (AS LONG AS IT'S NOT AN ARROW FUNCTION) to the element we call addEventListener to. runMethod is meant to be a replica of addEventListener, but it doesn't come with this special property and "this" ends up referring to the window object.

// How the new keyword works:

function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return {} // if we were to uncomment out this, an empty object gets returned instead of the custom one. However if we return anything other than an object, the return is basically ignored.

  // return this;  (implicitly)
}

console.log(User("Bert")); // this could work if inside User you added a line if(!new.target) return new User(name)

const sampleArr = [["hi"]];

console.log(sampleArr[0][2]?.[0], "out of range"); // out of range, but doesn't error out because we used ?

// Symbols are the only other data type that can be an object's key
// One main usecase for symbol is for adding properties to objects shared by other codebases. It guarantees that other people touching that object won't overwrite your property.

// the global symbol registry lets you keep track of symbols:

// read from the global registry (entire codebase has one registry)
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
console.log(id === idAgain); // true

// symbols are unique, multiple of the "same" symbol can exist as separate object properties
let lib = {
  name: "ABC",
};

lib[Symbol("id")] = 123;
lib[Symbol("id")] = 124; //Not changed

console.log(lib); // has 2 Symbol(id) properties

// JavaScript uses "system" symbols internally
// Symbol.hasInstance
// Symbol.isConcatSpreadable
// Symbol.iterator
// Symbol.toPrimitive

// Symbol.for("name") -> gives you symbol
// Symbol.keyFor(symbol) -> gives you value

const testSymbol = Symbol.for("test");
console.log(testSymbol, "testSymbol");
console.log(Symbol.keyFor(testSymbol), "Symbol.keyFor(testSymbol)");
