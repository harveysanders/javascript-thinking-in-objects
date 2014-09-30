"use-strict";

const
    model = require("./model");

function makeContacts(people, menu, prompt, contactsTable) {
    var _contacts = {
        people:         people,
        menu:           menu,
        prompt:         prompt,
        contactsTable:  contactsTable,
        
        add: function () {
            console.log('Add a contact:');
            prompt.get(['firstname', 
                        'lastname', 
                        'email', 
                        'telephone', 
                        'gender', 
                        'birthDate', 
                        'birthPlace'], 
                       function (err, input) {
                           var person = model.makePerson(input.firstname, 
                                                         input.lastname, 
                                                         input.email, 
                                                         input.telephone, 
                                                         input.gender, 
                                                         input.birthDate, 
                                                         input.birthPlace);
                // confirm entry //
                console.log('You entered:');
                console.log(person);
                
                var properties = [
                    {
                      name: 'input', 
                      validator: /^[yn]/,
                      message: 'Is this ok?: (y/n)',
                      required: true
                    }
                ];
                
                prompt.get(properties, function (err, result) {
                    if (err) { return onErr(err); }
                    switch(result.input) {
                        case "y":
                            people.add(person);
                            console.log('%s was added to your contacts', person.name());
                            break;
                        case "n":
                            console.log('% was not added to your contacts, try again', person.ame());
                            break;
                    }
                    menu.show();
                });
          });
        }
    };
    
    // OTHER INITIALIZATION //
    
    function onUserInput(input) {
        switch(input) {
            case "1":
                _contacts.contactsTable.show(prepareValues(_contacts.people.values));
                _contacts.menu.show();
                break;
            case "2":
                _contacts.add();
                break;
            case "q":
                console.log('Bye bye: shutting down...');
                process.exit(0);
                break;
        }
    }
    
    function prepareValues(values) {
        var prepared = [];
        var contact;
        for (var i = 0; i < values.length; i++) {
            contact = values[i];
            prepared.push([i+1, 
                          contact.name(), 
                          contact.email, 
                          contact.telephone, 
                          contact.gender, 
                          contact.birthDate, 
                          contact.birthPlace]);
        }
        return prepared;
    }
    
    // TODO : 
    menu.on('userInput', onUserInput);
    
    // TODO : 
    people.once('loaded', function () {
        menu.show();
    });
    people.load();
    
    return _contacts;
}
module.exports.makeContacts = makeContacts;

function onErr(err) {
    console.log(err);
    return 1;
}
