console.log(
  new Date(),
  Date.now(),
  "first gives date, the other gives timestamp"
);

/*
  Every code block {...} (and function and script) have an internal (hidden) associated object known as the lexical environment.
  It consists of:
  1. Environment record, an obj that stores local variables as its properties (and this)
  2. A reference to the outer lexical environment, the one associated with the outer code

  When we change variables, we are really changing a property on an object. Btw this object exists theoretically so we can't actually see it.

  All functions have a hidden property named [[Environment]] which keeps reference to the lexical environment where the function was created. This is how closures are able to work. In JavaScript, it's correct to say that all functions are closures.
  */

for (var i = 0; i < 3; i++) {
  console.log(i, "i?");
  setTimeout(() => console.log(i, "i is 3 cause var is stored in global obj"));
}

// var only scopes within a function, so people used to use IIFEs to emulate blocks. Nowadays there is little reason to do this.

// remember functions are objects, they have a name and length property and you can add whatever other property you want to it.

let sum = new Function("a", "b", "return a + b"); // a way to create functions if you are getting strings from the backend for example

console.log(sum(1, 2)); // 3

// Decorators are functions that wrap another function to alter behavior. When trying to use it with an obj method, we must use call or apply to pass on "this" context
// call, apply, and bind are mostly used when dealing with objects and preserving the "this" context. However bind also lets you bind arguments, regarding in partial functions.

function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

console.log(double(3)); // = mul(2, 3) = 6
console.log(double(4)); // = mul(2, 4) = 8
console.log(double(5)); // = mul(2, 5) = 10

// We can do stuff to object properties besides freezing them
const testObj = { name: "Bert" };
Object.defineProperty(testObj, "name", { writable: false });
testObj.name = "Jan"; // won't work now. In strict mode this throws error!
console.log(testObj, "testObj");

// getters and setters

const animalObj = {
  name: "turtle",
  get status() {
    return this.name + "'s rock";
  },
  set newName(name) {
    this.name = name;
  },
};

console.log(animalObj.name);
console.log(animalObj.status);
console.log((animalObj.newName = "bird"));

/*
Objects have a special hidden property [[Prototype]] that is either null or references another object

obj.hasOwnProperty(key) returns false if the property is inherited
*/

const seaTurtle = Object.create(animalObj, {
  swims: { value: true },
});
console.log(
  Object.getPrototypeOf(seaTurtle) === animalObj,
  "Object.create() and getPrototype of are the most modern ways of working with prototypes"
);
console.log(
  seaTurtle.swims,
  "it can swim thanks to the optional second argument of Object.create()"
);
