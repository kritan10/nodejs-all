import process from 'node:process';
import blessed from 'blessed';

// Create a screen object
const screen = blessed.screen({
	smartCSR: true,
	title: 'Split Terminal',
});

// Create an output box
const output = blessed.list({
	top: 0,
	left: 0,
	width: '100%',
	height: '80%',
	tags: true,
	border: {
		type: 'line',
	},
	style: {
		fg: 'white',
		border: {
			fg: '#f0f0f0',
		},
	},
});

// Create an input box
const input = blessed.textbox({
	bottom: 0,
	left: 0,
	width: '100%',
	height: '20%',
	inputOnFocus: true,
	border: {
		type: 'line',
	},
	style: {
		fg: 'white',
		border: {
			fg: '#f0f0f0',
		},
	},
});

// Append the boxes to the screen
screen.append(output);
screen.append(input);

// Handle user input
input.key('enter', () => {
	const userInput = input.getValue();
	output.addItem(userInput);
	// Handle the input here - process userInput
	input.clearValue(); // Clear the input box
	input.focus();
	screen.render();
});

// Focus on the input box by default
input.focus();

// Event handler for Ctrl+C to exit the program
screen.key(['C-c'], () => {
	return process.exit(0);
});

// Render the screen
screen.render();
