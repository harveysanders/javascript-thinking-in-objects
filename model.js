'use-strict';

var Person = function(id, firstName, lastName, gender, birthDate, birthPlace) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = gender;
	this.birthDate = birthDate;
	this.birthPlace = birthPlace;
};

Person.prototype.fullName = function() { return this.firstName + ' ' + this.lastName; };

module.exports.Person = Person;
