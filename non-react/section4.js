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

/* A typical class:

class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}

Note that methods exist on the prototype, but properties exist on the class itself

static properties and methods exist on the class as a whole rather than a specific class instance
*/

class CoffeeMaker {
  _protectedField = "allowed for inherting classes to see"; // allowed for internal and inherting classes
  #privateField = "can't see"; // private field - only for internal usage
  publicField = "can see";
  method() {
    console.log("hi");
  }
}

console.log(new CoffeeMaker().publicField, "we can only see this");

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter((item) => item >= 10);
// filteredArr is not PowerArray, but Array

// Mixin in OOP is a class that contains methods for other classes - since JavaScript doesn't allow multiple inheritances, we must implement them using mixins.
// We are really just copying methods into a prototype

// Mixin for logging functionality
const LoggerMixin = {
  log(message) {
    console.log(`[${this.name}]: ${message}`);
  },
};

// Mixin for validation functionality
const ValidationMixin = {
  validate() {
    return this.name && this.name.length > 0;
  },
};

// Class that uses the mixins
class User {
  constructor(name) {
    this.name = name;
  }
}

// Apply mixins to the User class
Object.assign(User.prototype, LoggerMixin, ValidationMixin);

// Now User instances have both logging and validation methods
const user = new User("John");
user.log("Hello!"); // [John]: Hello!
console.log(user.validate()); // true

try {
  // throw "can be string";
  blahh();
} catch (error) {
  console.log(error); // catches reference error above
}

class MyError extends Error {
  constructor(property) {
    super(property);
    this.name = "MyError";
  }
}

try {
  throw new MyError("age");
} catch (error) {
  console.error(error);
}

/*
Promise.all(promises) - rejects on first error
Promise.allSettled(promises) - return results for each promise
Promise.race(promises) - returns first settled promise
Promise.any(promises) - returns the result of the first successful promise

Promisification is the act of turning a fn that accepts callbacks into one that returns a promise. We can make a fn called promisify that does this.
*/

async function f() {
  // all async fns return a promise
}

console.log(f()); // Promise {<fulfilled>: undefined}, even though it was empty

function* generate() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generate();

generator.next();
generator.next(); // {value: 2, done: false}
console.log(generator.next().value, "gives 3, the return value");

// we can also pass from outside into yield... something that normal functions can't do
function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)

  console.log(result);
}

let generator2 = gen();

let question = generator2.next().value; // <-- yield returns the value

generator2.next(4); // --> pass the result into the generator, the result of yield more specifically

const awaitFn = async () => {
  for await (let i of [1, 2, 3]) {
    console.log(i, "whoa");
  }
};

awaitFn();

// super cool practical async generator application...
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      // (1)
      headers: { "User-Agent": "Our script" }, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get("Link").match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for (let commit of body) {
      // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}

(async () => {
  let count = 0;

  for await (const commit of fetchCommits(
    "javascript-tutorial/en.javascript.info"
  )) {
    console.log(commit.author.login);

    if (++count == 100) {
      // let's stop at 100 commits
      break;
    }
  }
})();
