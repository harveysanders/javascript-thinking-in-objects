"use-strict";

const 
	Person = require("./model").Person,
	List = require("./collections").List,
	people = new List('people');

require("./exit").init({
	exit: {actions: [people.saveSync]},
	sigint: {actions: [people.saveSync, process.exit]}
});

// people.load("path-to-persisted-list");

//people.add(new Person("", "Daneille", "Shubert", "Female", "03/07/1987", "Yucaipa, California, United States"));
//people.add(new Person("", "John", "Fraboni", "Male", "05/17/1970", "North Bay, Ontario, Canada"));

people.on('loaded', function () {
	console.log('app caught loaded');
	console.log(people.list);
});

people.load('people.json');

var count = 1;
for (var index in people.list) {
	console.log("The %d person in the list is %s", count, people.list[index].fullName());	
	count++;
}

// function exitHandler(options, err) {
//     if (options.save) {
//     	people.saveSync();
//     }
//     if (err) console.log(err.stack);
//     if (options.exit) process.exit();
// }

// // do something when app is closing
// process.on('exit', exitHandler.bind(null, {save: true}));

// // catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, {save: true, exit: true}));

// // catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null, {exit: true}));


// john.on('spoke', function (person, statement) {
// 	console.log('%s said %s', person.fullName(), statement);
// });

// john.speak("I love Daneille");
// daneille.speak("I love tacos... and ya, John, I mean...");



// var count = 1;
// for (var index in people) {
// 	console.log("The %d person in the list is %s", count, people[index].fullName());	
// 	count++;
// }
