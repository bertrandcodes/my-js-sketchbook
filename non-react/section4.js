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

for (var i = 0; i < 5; i++) {
  console.log(i, "i?");
}

// var only scopes within a function, so people used to use IIFEs to emulate blocks. Nowadays there is little reason to do this.
