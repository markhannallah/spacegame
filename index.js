var gamePrompt = require('game-prompt');


// Global variables
var playerName; 
var vehicleName;
var startingFuel = 1000;
var location;

var inventory = [6, 6, 6];

var planets = [
		{
			name: '(E)arth',
			distance: 10,
			inventory: 'You do not find artifacts here, dummy.\nHow' +
			'else can we help you?',
			tip: 'Quit asking for stuff. Go into space!'
		},
		{
			name: '(M)esnides',
			distance: 20,
			inventory: 'Because we are awesome, here is a Myoin Horn.' +
			' It is an ancient Mesndian instrument. Pretty cool right?' + 
			'What else can we do?',
			tip: 'Well, going to Laplides will be a waste of time, so...',
		},
		{
			name: '(L)aplides',
			distance: 50
		},
		{
			name: '(K)iyturn',
			distance: 120,
			inventory: 'Well you asked really nicely. Here is a Kiyturn Glass Bowl.',
			tip: 'We are isolationists and have nothing else to offer.'
		},
		{
			name: '(A)enides',
			distance: 25
		},
		{
			name: '(C)ramuthea',
			distance: 200,
			inventory: 'We already told you, we just experienced a disaster. Got nothing for you.',
			tip: 'Hm..., maybe check out Smeon.'
		},
		{
			name: '(S)meon',
			distance: 400,
			inventory: 'Well you seem pretty grand! Here is a Dried Cramun Flower!!',
			tip: 'Just an FYI - DO NOT GO TO Aenides !!!!....'
		},
		{
			name: '(G)leshan',
			distance: 85,
			inventory: 'Sucker! Got nothing for you.',
			tip: 'The Cramuthean are rich as shit, man!!'
		},
	]

//Intro prompt
function startGame() {
	gamePrompt('S.R.S.V. Press ENTER to start.', intro);
}

function intro() {
	gamePrompt('You are the captain of a Solo Research Space Vehicle (S.R.S.V.)' + 
		' on an expedition to explore foreign planets. Your mission is to make' +
		' contact with three alien life forms, acquire an artifact representative' + 
		'of their culture, and bring back your findings to Earth.', collectInfo);
}

//Collecting Info
function collectInfo() {
	gamePrompt([
		'A voice comes on over the intercom.', 
		'What is your name, you daring fool?',
	], collectName);
}

function collectName(name) {
	playerName = name;

	gamePrompt([
		'Thank you Captain ' + playerName + '.',
		' "Please state your vehicle name"'
	], collectVehicleName);
}


function collectVehicleName(name) {
	vehicleName = name;

	gamePrompt([
		'You have 1000 miles to travel anywhere you like in your ' + vehicleName +'.',
		'The point of your mission is to collect three artifacts...',
		'Well what are you waiting for?! Be on your way. ' + 
		'Here is an overview of where you can go:'
		], shareDistances);
}

//Where can they go?
function shareDistances() {
	for (i = 0; i < planets.length; i++) {
		console.log(planets[i].name + ' ' + planets[i].distance + ' lightyears');
	}

	gamePrompt('Where would you like to go?', pickAPlace);
}

function pickAPlace(name) {
	name = name.toLowerCase();
	if (name === 'earth' || name === 'e') {
		planets[0].convoStarter();
	} else if (name === 'mesnides' || name === 'm') {
		planets[1].convoStarter();
	} else if (name === 'laplides' || name === 'l') {
		planets[2].convoStarter();
	} else if (name ==='kiyturn' || name === 'k') {
		planets[3].convoStarter();
	} else if (name === 'aenides' || name === 'a') {
		planets[4].convoStarter();
	} else if (name === 'cramuthea' || name === 'c') {
		planets[5].convoStarter();
	} else if (name === 'smeon' || name === 's') {
		planets[6].convoStarter();
	} else if (name === 'gleshan' || name === 'g') {
		planets[7].convoStarter();
	} else {
		gamePrompt([
			'I think you mistyped something.',
			'Here is an overview of where you can go:'
			], shareDistances);
	}
}

//All the convos that they can have!! 
function earthConvo() {
	startingFuel -= planets[0].distance;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	startingFuel += 10;

	if (inventory[0] === 1 && inventory[1] === 2 && inventory[2] === 3) {
		console.log('Holy Smokes, you won the game!');
	} else gamePrompt([
		'Uh, you only have ' + inventory.length + ' artifacts. You need three. ' + 
		'Be on your way and find them, we will add 10 gallons to your tank so you now' +
		' have' + startingFuel + 'gallons left.'
	], shareDistances);

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');
}

function mesnidesConvo() {
	startingFuel -= planets[1].distance;
	inventory[0] = 1;
	location = 1;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	gamePrompt('Welcome to Mesnides!!! Blah blah, we are great people' +
	'how can we help you?', askForStuff);
}

function laplidesConvo() {
	startingFuel -= planets[2].distance;
	location = 2;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	gamePrompt('Holy shit!!! Atomic war is going on. You better leave.', shareDistances);
}

function kiyturnConvo() {
	startingFuel -= planets[3].distance;
	inventory[1] = 2;
	location = 3;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	gamePrompt([
		'....we are pretty shy.',
		'...very shy',
		'But how can we help you?'
		], askForStuff);
}

function aenidesConvo() {
	startingFuel -= planets[4].distance;
	location = 4;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	gamePrompt('Ah crap, they are shooting at us. We better leave.', shareDistances);
}

function cramutheaConvo() {
	startingFuel -= planets[5].distance;
	location = 5;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	startingFuel += 500;

	gamePrompt([
		'We would love to help, but we recently experienced disaster',
		'Hm.... well we could give you 500 gallons of fuel.',
		'Here you go.' + 'You now have' + startingFuel + 'gallons of fuel.' 
		], askForStuff);
}

function smeonConvo() {
	startingFuel -= planets[6].distance;
	inventory[2] = 3;
	location = 6;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	startingFuel += 100;

	gamePrompt([
		'We are a friendly people',
		'Hm.... prove it? Here is 100 gallons of fuel.',
		'There you go.' + 'You now have' + startingFuel + 'gallons of fuel.' +
		' How else can we help you?'
		], askForStuff);
}

function gleshanConvo() {
	startingFuel -= planets[7].distance;
	location = 7;

	console.log('You have ' + startingFuel + ' gallons of fuel left. Use it wisely.');

	gamePrompt([
		'Bleh, we are tired',
		'But how can we help you?'
		], askForStuff);
}

//Bread and butter --- connects convos to planets object 
function askForStuff() {
	gamePrompt(
		'Ask about (A)rtifact\nAsk about other (P)lanets\n(L)eave', whatHappens);
}


function whatHappens(response) {

	response = response.toLowerCase();
	
	if (response === 'artifact' || response === 'a') {
		gamePrompt(
			planets[location].inventory, askForStuff);
	} else if (response === 'planets' || response === 'p') {
		gamePrompt(
			planets[location].tip, askForStuff);
	} else if (response === 'leave' || response === 'l') {
		gamePrompt(
			'Sure, head on out.', shareDistances);
	} else {
		gamePrompt([
			'I think you mistyped something.',
			'Now, what do you reallyyyy want?'
			], askForStuff);
	}
}

startGame();



