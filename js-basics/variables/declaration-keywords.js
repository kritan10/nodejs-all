// Variables in JavaScript are declared using one of three keywords: let, const, or var.


// --- let --- //
let a = 1
// variables declared using let can be reassigned and are scoped
// i cannot be accessed here
for (let i = 0; i < 5; i++) {
    // i can only be accessed here
}
// i cannot be accessed here

// --- const --- //
const c = 1
// variables declared using let cannot be reassigned and are scoped
// c = 10 would give error


//--- var ---//
var b = 1
// variables declared using let can be reassigned and are not scoped


// Temporal Dead Zone
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz

// scoped variables show interesting properties
const example = () => {
    // TDZ starts at beginning of scope
    console.log(bar); // "undefined"
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    var bar = 1;
    let foo = 2; // End of TDZ (for foo)
}
