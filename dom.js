console.log(window); // we can use it as a global object - window.sayHi()

queueMicrotask(() => console.log("this should run at the end"));

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

// Attributes are defined in html. Properties are part of the DOM object. They sometimes map, but sometimes don't!
console.log($helloWorld.attributes);
console.log($helloWorld.getAttribute("id"));
// Usually changing attribute changes the property, but if we do input.value = "something", changing the property does not change the attribute. This allows us to recover the "original" value from HTML.

// we use data-* for custom attributes, incase the language adds something in the future that overwrites the attribute we came up with.

const $appendButton = document.createElement("button");
$appendButton.textContent = "click me";
document.body.append($appendButton);
// $appendButton.remove();

// don't use old methods, like appendChild, removeChild, or document.write

// add before and after a node
$appendButton.insertAdjacentHTML("beforebegin", "<p>adding before</p>");
$appendButton.insertAdjacentHTML("afterend", "<p>adding after</p>");

// clone
const $anotherButton = $appendButton.cloneNode(true);
document.body.append($anotherButton);

$helloWorld.classList.add("hello");
$helloWorld.style.color = "white";
$helloWorld.style.removeProperty("color");
// we can also do this... this is rarely used though - div.setAttribute('style', 'color: red...') also does the job
$helloWorld.style.cssText = `color: red !important;
background-color: yellow;
width: 100px;
text-align: center;
`;

// in order to read the style, we need getComputedStyle

console.log(getComputedStyle($helloWorld).color);
// don't use this to get width and height as those can be dependent on box-sizing. Use offsetWidth/offsetHeight/clientWidth/clientHeight, or better yet, getBoundingClientRect

// we can add a property to handle clicks like $appendButton.onclick... but what if we want two? That's why we use addEventListener
$appendButton.addEventListener("click", () => console.log("handler 1"));
$appendButton.addEventListener("click", (e) => {
  console.log(e.type, e.currentTarget, e.clientX, e.clientY, "handler 2"); // click, appendButton element, window-relative coordinates
});

// to capture an event in the capturing phase, we set the second arg of addEventListener to true. This is rarely used. button.addEventListener(fn, true)

/*
IMPORTANT: when dealing with grids where each box needs an action... we use event delegation so that we don't end up putting an event handler on each item!
instead we can catch the events in the parent, the deduce which box was clicked on within the event and target that one specifically.

table.onclick = function (event) {
  let td = event.target.closest("td"); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
*/

// <div oncopy="alert('Copying forbidden!');return false"> returning false on a handler means the handle action is prevented. Here we prevent copying text.

// mouseenter/leave is simpler to understand and use, but they do not bubble. If we want event delegation like for a big table, we should use mouseover/out.
// these days it is preferred to use pointer events instead of mouse, to account for touch screen and pens.

document.addEventListener(
  "DOMContentLoaded",
  () => console.log(document.readyState, "DOM is ready") // interactive - DOM is ready, but resources still need to be loaded
);
console.log(document.readyState, "ready state"); // loading

window.onload = () => {
  console.log(document.readyState, "it's complete now"); // complete
};

// window.onbeforeunload = function (e) {
//   const message = "Are you sure you want to leave?";
//   e.returnValue = message; // For Chrome
//   return message; // For Firefox
// };
// ^this should theoretically show a message when you try to close the page

// defer makes sure html is parsed before executing the script. async executes script once it's ready, possibly in the middle of HTML parsing. https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html#script
// use async when possible, unless scripts rely on each other. With async there is no guarentee of order, whatever loads first executes first.

/*
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>

^ Crossorigin policy doesn't allow us to see errors from another domain. To fix CORS, we need to add either "anonymous" or "use-credentials" as an attribute in the script tag.
The former requires the server to set Access-Control-Allow-Origin = *. Authorization info and cookies are not sent to the remote server.
The latter involves the server changing 2 things so that authorization info and cookies can be sent.
*/

let observer = new MutationObserver((mutationRecords) => {
  console.log(mutationRecords, "mutation records");
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// MutationObserver can be useful for blocking ads from third party scripts

// Get the second element in the document
const secondElement = document.body.children[1];

// Create a range
const range = document.createRange();

// Set the range to cover the entire second element
range.selectNode(secondElement);

// Apply the selection
document.getSelection().addRange(range);

// wow, you can automatically select items on a page

// Microtasks are like the super VIP line. Regular line people are macrotasks. After every regular person goes in, we let in everyone in the VIP line (followed by a render). A settimeout is someone from the macrotask line going all the way back to the end of the line.
