'use-strict';

var Person = function(firstName, lastName, email, telephone, gender, birthDate, birthPlace) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.telephone = telephone;
	this.gender = gender;
	this.birthDate = birthDate;
	this.birthPlace = birthPlace;
};

Person.prototype.fullName = function() { return this.firstName + ' ' + this.lastName; };
Person.deserialize = function (data) {
	var p = new Person(data.firstName, data.lastName, data.email, data.telephone, data.gender, data.birthDate, data.birthPlace);
	return p;
}
module.exports.Person = Person;
