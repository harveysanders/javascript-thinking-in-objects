"use-strict";

const 
	prompt = require("prompt"),
	Person = require("./model").Person,
	List = require("./collections").List,
	people = new List('people');

require("./exit").init({
	exit: {actions: [people.saveSync]},
	sigint: {actions: [people.saveSync, process.exit]}
});

people.on('loaded', function () {
	promptUser();
});

people.load('people.json');

function promptUser() {
	var properties = [
		{
		  name: 'input', 
		  validator: /^[1-9q]+$/, ///^[1-9\s\,]+$/,
		  message: 'Contacts\n(1) Show (2) Add (q) Quit' ,
          required: true,
		  warning: 'Invalid input!'
		}
	];

	prompt.start();

	prompt.get(properties, function (err, result) {
		if (err) { return onErr(err); }
		switch(result.input) {
		    case 1:
		        showContacts();
		        break;
		    case 2:
		        addContact();
		        break;
		}
	});

	function onErr(err) {
		console.log(err);
		return 1;
	};
};

function showContacts(id) {
	console.log('showing record not implemented yet...');
}

function addContact(id) {
	console.log('showing record not implemented yet...');
}


// people.load("path-to-persisted-list");

//people.add(new Person("", "Daneille", "Shubert", "Female", "03/07/1987", "Yucaipa, California, United States"));
//people.add(new Person("", "John", "Fraboni", "Male", "05/17/1970", "North Bay, Ontario, Canada"));

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
