// Logical operators are used with boolean values

// OR (||) operator
// returns true if any one value is true
// returns false only when all values are false
console.log("OR operator");
console.log(true || false);

// AND (&&) operator
// returns false if any one value is false
// returns true only when all values are true
console.log("AND operator");
console.log(true && false);

// NOT (!) operator
// returns the inverse of the given boolean
console.log("NOT operator");
console.log(!true);

// Truthy and Falsy
// In JS, every object has a truthy or falsy value
// falsy values return false when evaluated as boolean and same with truthy
// 0, '', false, null, undefined have falsy values 

console.log('' && true); // false

console.log(0 || null); // false

// Short circuit evaluation
// false && anything is short-circuit evaluated to false.
// true || anything is short-circuit evaluated to true.
