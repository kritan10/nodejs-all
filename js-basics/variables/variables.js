// Data types in JS
// Number, BigInt, String, Boolean, Symbol, Undefined, Null

//--- Number ---// 
// Used for all number values (integer and floating point) except for very big integers.
// The Number type is a IEEE 754 64-bit double-precision floating point value
// Within numbers, JavaScript does not distinguish between floating point numbers and integers.

// No conversion required
console.log("5 / 2 = ", 5 / 2);

// Because of IEEE 754 encoding, sometimes floating point arithmetic can be imprecise
console.log("0.04 + 0.01 =", 0.04 + 0.01)

// Number literals
// (0b111110111) = 503
// (0o767) = 503
// (0x1f7) = 503
// (5.03e2) = 503

// NaN : Not a Number.
// "invalid math" operations will return NaN.
console.log("Math.log(-2) = ", Math.log(-2))

// It is considered a Number, so calculation with NaN will return NaN.
console.log("NaN + 5 = ", NaN + 5);

// NaN is the only value in JavaScript that's not equal to itself (per IEEE 754 specification).
console.log("NaN === NaN ", NaN === NaN);

// Infinity: returned when attempting to divide by 0
console.log("12 / 0 = ", 12 / 0)

// BigInt: used for arbitrarily large integers.
// BigInt values represent numeric values which are too large to be represented by the number primitive.
// BigInt values are suffixed by 'n'.

const maxInt = Number.MAX_SAFE_INTEGER

console.log("Highest possible integer", maxInt);
console.log();

const sum = (maxInt + 1) === (maxInt + 3) // should give false but gives true
const bigIntSum = BigInt(maxInt + 1) === BigInt(maxInt + 3) // gives false

console.log("(maxInt + 1) === (maxInt + 3) =", sum, " (without BigInt)");
console.log("(maxInt + 1) === (maxInt + 3) =", bigIntSum, " (with BigInt)");


//--- String ---// 
// It represents character and/or sequence of characters
// It is used to store text.
// It is surrounded by "", '' or ``
let myString = "hello World"
console.log(myString);

// It is immutable
myString[0] = "A" // does nothing

// + operator used for concatenation
console.log("myString + '!': ", myString + "!")



// Boolean: true and false — usually used for conditional logic.


//--- Symbol ---//
// It is used for creating unique identifiers that won't collide.
const symbol1 = Symbol()
const symbol2 = Symbol()

console.log(symbol1 === symbol2);
console.log(symbol1.toString());


// --- Null & Undefined --- //
// Undefined:
// It indicates that a variable has not been assigned a value.
// A return statement with no value (return;) implicitly returns undefined.
// Accessing a nonexistent object property (obj.iDontExist) returns undefined.
// A variable declaration without initialization (let x;) will implicitly initialize the variable to undefined.

// Null:
// It indicates a deliberate non-value.
// It requires manual assignment unlike undefined.

let x;
let y = null
console.log(x);
console.log(y);

// Null: It is the intentional absence of the value. It is one of the primitive values of JavaScript. 
// Undefined: It means the value does not exist in the compiler.
