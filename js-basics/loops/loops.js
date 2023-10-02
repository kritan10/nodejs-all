// Loops in JavaScript

// for loop
// loop used when we know starting and ending points
console.log("For Loop");
for (let i = 0; i < 5; i++) {
    console.log(i);
}
console.log();

// while loop
// loop used when we do not when the loop should end 
// condition checked at the beginning of the loop

console.log("While Loop");
let i = 0
while (i < 5) {
    console.log(i);
    i++
}
console.log();



// do..while loop
// loop used when we do not when the loop should end 
// condition checked at the end of the loop meaning the first iteration will always run

console.log("Do..While loop");
do {
    console.log("do while body");
} while (false)
console.log();

// break statement
// used to terminate the loop
console.log("Break statement");
for (let i = 0; i < 5; i++) {
    if(i == 3) {
        break;
    }
    console.log(i);
}
console.log();


// continue statement
// used to terminate the current iteration
console.log("Continue statement");
for (let i = 0; i < 5; i++) {
    if(!(i % 2)) {
        continue;
    }
    console.log(i);
}
console.log();

const array = [14,9,65,27,44]

// used to loop through all the keys of a collection
console.log("For in loop");
for (const num in array) {
    // num = indices of array
    console.log(num);
}
console.log();

// used to loop through all the values of a collection
console.log("For of loop");
for (const num of array) {
    // num = values of array
    console.log(num);
}
console.log();