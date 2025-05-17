console.log(window); // we can use it as a global object - window.sayHi()

// DOM is accessible through the document object (window.document). We can change or create anything on the page using it.
// window.navigator includes things like information about the browser and window.location allows you to go to a new url. These are part of the BOM (Browser Object Model).

console.log(window.document, document); // same thing

// document is an object with methods inherited from the Document prototype chain. That contains methods like getElementById.

console.log(document.body.childNodes); // gets all child nodes including text - returns NodeList
console.log(document.body.children); // gets children nodes - returns HTMLCollection

// elements are tags, nodes can be anything (including text string between <button>...</button>)

// Top ways to get an element:
// #1
console.log(document.querySelector(".target"), "query selector"); // also works with css. GOAT method.
// #2
console.log(document.getElementById("target"), "by id"); // works really well too. better performance, use if there is an id.
// LIVE RESULTS
console.log(document.getElementsByClassName("target")[0], "by classname"); // gives a collection so you should access it using [0]. Unlike query selector results, this collection is live, meaning if you change it then access it, the values are updated.
// honorary mention
console.log(document.getElementsByTagName("div"), "by tag"); // tag
const $targetDiv = document.querySelector(".target");

console.log($targetDiv.matches(".target")); // matches
console.log($targetDiv.closest("html")); // gets closest ancestor

// Prototype inheritance allows for elements to have features. Everything (input, button, etc.) inherit from EventTarget, which allows for events. They also inherit from Node, which allows functionality like parentNode, childNodes, etc.
// Text elements inherit from CharacterData, while buttons don't. Think of the graph image. https://javascript.info/basic-dom-node-properties
// DOM nodes are regular JavaScript objects!

/*
DOM classes aren't described using JavaScript, rather a special Interface description language!

interface HTMLInputElement: HTMLElement {
  // here go properties and methods of <input> elements

  // "DOMString" means that the value of a property is a string
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

  // boolean value property (true/false)
  attribute boolean autofocus;
  ...
  // now the method: "void" means that the method returns no value
  void select();
  ...
}
*/

$targetDiv.innerHTML = "<button>new button"; // wow it corrects itself
$targetDiv.innerHTML += " overwrites"; // this does a full overwrite, so be careful because this can be bad for performance

$targetDiv.outerHTML = "<button>using outer";
console.log($targetDiv, "this is still the prev button though!");

const $helloWorld = document.getElementById("hello");
$helloWorld.firstChild.data = "whoa";
console.log($helloWorld.firstChild.data);
// text.data allows you to add data to literal string text... interesting

$helloWorld.textContent = "much safer than innerHTML";

// setInterval(() => ($helloWorld.hidden = !$helloWorld.hidden), 1000); // shorter to write than display:none
