'use-strict';

// TODO 1 : create the makePerson factory //
function makePerson(firstName, lastName, email, telephone, gender, birthDate) {
    var _person = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone,
        gender: gender,
        birthDate: birthDate,
        
        name:   function() {
            return _person.firstName + ' ' + _person.lastName;
        }
    };
    return _person;
};

// TODO 2: expose the makePerson factory //
module.exports.makePerson = makePerson;

// TODO 3: create the makePersonFromJSON method and expose it 
module.exports.makePersonFromJSON = function (data) {
    return makePerson(data.firstName, data.lastName , data.email, data.telephone, data.gender, data.birthDate);
}
