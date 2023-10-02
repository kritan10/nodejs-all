// conversion from string to number

const stringNum = "123.456"

// parseInt removes precision
console.log(parseInt(stringNum));

// parseFloat is function to parse string to number
console.log(parseFloat(stringNum));

// number constructor can take string
console.log(Number(stringNum));

// unary operator is shorthand for Number constructor
console.log((+stringNum));