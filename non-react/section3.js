/*
How do we handle comparing or operating on both an object and a primitive at the same time?

How are objects converted to the correct primitive?

First thing JavaScript does is call the method [Symbol.toPrimitive] to see if it exists
*/

const bertWithPrimitive = {
  name: "Bert",
  [Symbol.toPrimitive]: function () {
    return this.name + 9000;
  },
};

// alert(bertWithPrimitive); // will return "Bert9000"

const randomWithPrimitive = {
  [Symbol.toPrimitive]: function (hint) {
    // default fn gets called with a hint argument
    return {};
  },
};

// console.log(randomWithPrimitive + 1); // throws error: cannot convert object to primitive value. Primitive value must be either string or number.

const randomWithPrimitive2 = {
  valueOf: function () {
    console.log(
      "not called if a string hint exists, because default toString method will be called instead"
    );
    return 6;
  },
};

// alert(randomWithPrimitive2); // remember this calls the default toString which exists on every object. That method always returns "[object Object]". The default valueOf method returns the equivalent object.

/*

If not, we look at the context for a "hint", to see whether coersion to a string or to a number is more appropriate.

For example, if we are using alert(obj) we probably want to output a string, but if we are using arithmetics we probably want a number.

Then either the valueOf() or toString() properties is called. These are older JavaScript object methods, which is why they dont have Symbol in their names.

Sometimes we opt to write our own toString() methods as a catch all for both number and string conversions.
*/

/*
In JavaScript, primitives need to be lightweight, but it's also helpful to have methods on them like objects.

The solution is to create a temporary "object wrapper" is created when we do something like str.toUpperCase(). str here is still a primitive, but to use a method an object is created and destroyed for us by the JavaScript engine efficiently.
*/

console.log(1_000_000, "this works btw, the underscores get trimmed");
console.log(1e6, "shorter version");
console.log(1e-6, "decimals");
console.log(
  (123).toString(),
  "double decimals work instead of (123).toString()"
);

console.log(
  isNaN("string"),
  Number.isNaN("string"),
  "latter is more accurate, former is more commonly used. This goes for isInfinite as well."
);

console.log(+"6px", "doesnt work");
console.log(parseInt("6px"), "does work");

// Strings

const str = "hey";
console.log(
  str[-2],
  str.at(-2),
  "the latter way gets the index from the end and returns e rather than undefined"
); // .at works with arrays too!
console.log(
  str.includes("y", 3),
  "second param specifies where to start searching from"
);

// for slice = beginning included, end excluded

// Arrays are used for order collections, and where you may want to insert and sort. Objects aren't meant for this.

// Arrays are objects, aka they are objects with special powers, but at the core they are still objects (they get passed as reference).
// If you treat Arrays like objects, you lose the special powers aka array-specific optimizations. For example arr.property = something... that will make you lose the power of arrays.

const myArr = [];
myArr.prop = "hey";
myArr.push("123");
myArr[3] = "wow";
console.log(myArr); // ['123', empty × 2, 'wow', prop: 'hey'] - Seems to work, but don't do it...

const arr1 = [];
arr2 = arr1;
console.log(arr1 == arr2); // true

// splice is the swiss army knife. Specify start location, how many to delete (can be 0), what to add (can be as many arguments as you want)

["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  console.log(`${item} is at index ${index} in ${array}`);
});
// I forget there's that third array param. It's not very useful though as it doesn't change.

// don't forget the find fn, it returns the element if found. findIndex returns index.
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

let user = users.find((item) => item.id == 1);

// let's implement iteration to understand in. Basically we need a property that gets called once, then has a next method that gets called until we hit done.

const range = {
  start: 1,
  end: 6,
  [Symbol.iterator]: function () {
    return {
      current: this.start,
      last: this.end,
      next: function () {
        if (this.current === this.last) {
          return {
            done: true,
          };
        } else {
          return {
            done: false,
            value: this.current++,
          };
        }
      },
    };
  },
};

for (const num of range) {
  console.log(num);
}

/*
Iteration requires:
1. [Symbol.iterator] property
2. That method returns an object with a next method
3. That next method has a done property

This prevents 2 loops from operating on the same array at the same time
*/

let str2 = "Hello";

let iterator = str2[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // outputs characters one by one
} // This is another less common way of using iterators, but gives more control

// There are iterables and array-like objs. These are different. Array.from() turns either of these into a real array.

const map = new Map([
  [2, 2],
  [3, 4],
  [{ objKey: 1 }, "whoa"],
]); // instead of passing in an array of tuples, we can also do Object.entries(obj)

// unlike objects, maps allow for any data type as keys, including objects
// maps also preserve order in which values are inserted

for (const key of map.values()) {
  console.log(key);
}

for (let entry of map) {
  console.log(entry, "this works");
}

let obj = Object.fromEntries(map); // this creates an obj from map
console.log(obj, "obj from map");

// Set and Map both have their own .forEach(value, valueAgain, set/map) - weird params, but they are to ensure consistency with the typical forEach method

// WeakMap only takes objects as keys and they get garbage collected when the object key gets overwritten, unlike with map. It's good for data storage and caching. Weakset is the same.

let objKey = { hey: "ho" };

const strongMap = new Map([[objKey, 1]]);

objKey = null; // delete it

console.log(strongMap, "objKey still exists in here");

let objKey2 = { hey: "ho" };

const weakMap = new WeakMap([[objKey2, 1]]);

objKey2 = null; // delete it

console.log(
  weakMap,
  "objKey doesn't exists in weak map... well it does... but it won't be around after garbage collection!"
);

let objKey3 = { hey: "ho" };

const weakSet = new WeakSet([objKey3]);

objKey3 = null; // delete it

console.log(weakSet, "weak set"); // also shows obj for now, but it gets garbage collected later

let first = 1;
let second = 2; // semicolon is important here!
[first, second] = [second, first];
console.log(first, second, "should be swapped");

const destructureObj = { hey: "ho" };
const { hey: heyNow } = destructureObj;

console.log(heyNow, "renaming from destructure");
