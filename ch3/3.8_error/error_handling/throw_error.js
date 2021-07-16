// throw err객체 vs throw new Error

// try {
//   throw "I'm Evil"
//   console.log("You'll never reach to me", 123465)
// } catch (e) {
//   console.log(e); // I'm Evil
// }

// try {
//   throw new Error("I'm Evil")
//   console.log("You'll never reach to me", 123465)
// } catch (e) {
//   console.log(e); // Error: I'm Evil
// }

try {
  throw Error("I'm Evil")
  console.log("You'll never reach to me", 123465)
} catch (e) {
  console.log(e.name, e.message); // Error I'm Evil
}

console.log(typeof(new Error("hello"))) // object
console.log(typeof(Error("hello"))) // function