#!/usr/bin/env node

'use-strict';

// TODO 4 : require the model module //
const 
    model = require('./model'),
    view = require('./view'),
    prmpt = require("prompt"),
    collections = require('./util/collections'),
    controller = require('./controller'),
    exit = require("./util/exit");
    
// TODO 5 : using the model factory, make a person object and print it to the console
//var me = model.makePerson("Jill", "Williams", "Female", "03/07/1987", "Yucaipa, California, United States");
//console.log(me);

var people = collections.makeList('people.json', model.deserializePerson);
var contacts = controller.makeContacts(people, 
                                       view.makeMenu('Please select: (1) Show, (2) Add, (q) Quit', 
                                                     /^[1-9q]$/), 
                                       prmpt, 
                                       view.makeTable(['No.', 
                                                       'Name', 
                                                       'Email', 
                                                       'Telephone', 
                                                       'Gender', 
                                                       'D.O.B.', 
                                                       'Birth Place']));

// TODO :
exit.init({
    exit: {actions: [people.saveSync.bind(people)]},
    sigint: {actions: [people.saveSync.bind(people), process.exit]}
});