/* A module is nothing more than a file. One script is a module. Modules use import and export statements.
import/export are static and that's a good thing for tree-shaking to work
but dynamic imports - import(module) loads the module and returns a promise that resolves into a module object that contains all its exports
this can be placed anywhere in the code

Example:

<!doctype html>
<script>
  async function load() {
    let say = await import('./say.js');
    say.hi(); // Hello!
    say.bye(); // Bye!
    say.default(); // Module loaded (export default)!
  }
</script>
<button onclick="load()">Click me</button>
*/

{
  let target = {};
  let proxy = new Proxy(target, {});
  proxy.test = 2;
  console.log(target); // {test: 2}
}

{
  let target = [1, 2, 3];
  target = new Proxy(target, {
    get(target, prop) {
      // here we are making a trap for get. There are a bunch of traps we can set.
      if (prop == 2) {
        console.log(prop);
        return 0;
      } else {
        return target[prop];
      }
    },
  });
  console.log(target[1], target[2]); // 2 and 0
}

{
  let target = [1, 2, 3];
  target = new Proxy(target, {
    get(target, prop) {
      // here we are making a trap for get. There are a bunch of traps we can set.
      if (prop == 2) {
        console.log(prop);
        return 0;
      } else {
        return Reflect.get(target, prop); // does the same as target[prop], only in some situations when dealing with prototypes and proxies, it returns the right thing
      }
    },
  });
  console.log(target[1], target[2]); // 2 and 0
}

console.log(eval("1+1"));

// (user.name == "John" ? user.hi : user.bye)(); // Error! user.hi is not a function, but a "Reference type"... just know its used internally by the language and looks like (base, name, strict)

{
  let user = { name: "Bert" };
  let admin = new WeakRef(user);
  delete user;
  console.log(admin); // if admin were a normal obj, it would still have reference to user. But with WeakRef, user gets garbage collected

  const ref = admin.deref();
  console.log(ref); // gives a object if accessible, undefined if it has been garbage collected
}

{
  let user = { name: "John" };

  const registry = new FinalizationRegistry((heldValue) => {
    console.log(`${heldValue} has been collected by the garbage collector.`);
  });

  registry.register(user, user.name);

  delete user.name; // eventually, the message in final registry callback should be logged
}
