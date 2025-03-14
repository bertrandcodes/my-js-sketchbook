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
    console.log(this.firstName);
  },
};

thisUser.sayHi();

let thisNewUser = {
  firstName: "Todd",
};

thisNewUser.sayHi = thisUser.sayHi;

thisNewUser.sayHi();

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
