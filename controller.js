"use-strict";

const
    model = require("./model");

function makeContacts(people, menu, prompt, table) {
    var _contacts = {
        people: people,
        menu:   menu,
        prompt: prompt,
        table:  table,
        
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
    
    // TODO 12 : create the onUserInput event listener //
    function onUserInput(input) {
        switch(input) {
            case "1":
                _contacts.table.show(prepareValues(_contacts.people.values));
                _contacts.menu.show();
                break;
            case "2":
                console.log('Peace out: shutting down...');
                process.exit(0);
                break;
        }
    }
    
    
    // TODO 13 : on the menu object, listen for the userInput event //
    menu.on('userInput', onUserInput);
    
    
    // TODO : 14 on the people object, listen for the loaded event //
    people.once('loaded', function() {
        menu.show();
    })
    
    // TODO 15 : call the load method on the people object //
    people.load();
    
    return _contacts;
}
module.exports.makeContacts = makeContacts;

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

function onErr(err) {
    console.log(err);
    return 1;
}
