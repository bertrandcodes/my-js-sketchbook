"use strict";
// prevents "this" keyword from referring to the global scope, among other things

console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
// ^ these are the same, so we use BigInt to differentiate

const bigInt = 1234567890123456789012345678901234567890n;

console.log(bigInt, "bigInt");

// + operator with string turns everything to concatenate as a string
console.log(1 + "2"); // this is 12

// subtraction triggers a numeric conversion
console.log(3 - "2"); // this is 1

// + converts empty arrays and objects into "" and - converts them into the number 0

// empty array and objects are truthy, but empty strings and zeros are falsy

// with arithmetic, null is treated as 0, but undefined is NaN
console.log(null + 1); // 1
console.log(undefined + 1); // NaN

// when using * or /, strings get converted into numbers
console.log("10" * 2); // 20
console.log("10" / 2); // 5
console.log("10" * "2"); // 20
console.log("10" / "2"); // 5

console.log("" + 10); // coerced to string
console.log("" * 10); // coerced to 0

console.log({} * 1); // becomes "[object Object]" <- the string representation of an Object when it is converted to a string

// true gets coerced to 1, false to 0, null to 0, undefined to NaN - this is because undefined logically speaking is neither definitively truthy nor falsy
// with arrays, single elements are coerced to their primitive value: [2] to 2
// multielements are coerced to string "2,3"
console.log([2, 3] + 2); // 2,32
console.log([2, 3] + ""); // 2,3, wow, this is neat

console.log(Number("   123   ")); // 123
console.log(Number("123z")); // NaN (error reading a number at "z")
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// don't forget the exponentiation operand exists! **
console.log(2 ** 5); // 32

console.log(2 + 2 + "1"); // "41" and not "221"
console.log("1" + 2 + 2); // "122" and not "14"
// operation goes left to right

// + is an unary numeric conversion, does the same as Number(...)
console.log(+true); // 1
console.log(+""); // 0
console.log(+{}); // NaN
console.log(+"123"); // 123

let apples = "2";
let oranges = "3";

// both values converted to numbers before the binary plus
console.log(+apples + +oranges); // 5

let a = 1;
let b = 2;

let c = 3 - (a = b + 1);

console.log(a); // 3
console.log(c); // 0
// crazy stuff

let d, e, f;

d = e = f = 2 + 2;
// everything equals 4

{
  const a = 3;
  console.log(a);
}
// sometimes you can just make your own block

{
  let counter = 1;
  let a = ++counter;
  console.log(a); // 2, since ++ before is prefix and returns the new val, as opposed to postfix which returns the old val
}

{
  let a = (1 + 2, 3 + 4);

  console.log(a); // 7 (the result of 3 + 4)
  // the comma throws away results of 3 + 4
  // please note that the comma operator has very low precedence, lower than =, so parentheses are important in the example above.
  // without them: a = 1 + 2, 3 + 4 evaluates + first, summing the numbers into a = 3, 7, then the assignment operator = assigns a = 3, and the rest is ignored. It’s like (a = 1 + 2), 3 + 4
}

console.log(null > 0); // (1) false
console.log(null == 0); // (2) false
console.log(null >= 0); // (3) true
// ^ comparators convert to numbers, so null becomes 0. == leaves null and undefined as they are. == does convert other data types to numbers though.
