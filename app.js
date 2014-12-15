#!/usr/bin/env node

'use-strict';

// TODO 4 : require the model module //
const
    model = require('./model.js'),
    
    
    // TODO 6 : require the collections and exit utility modules //
    collections = require('./util/collections'),
    exit = require('./util/exit'),
    // TODO 16 : require the view, prompt, and controller modules //
    view = require('./view'),
    prmpt = require('prompt'),
    controller = require("./controller");
    
// TODO 5 : using the model factory, make a person object and print it to the console //


// TODO 8 : create a list object that will manage a collection of people //
var people = collections.makeList("people.json", model.makePersonFromJSON);


// TODO 9 : add the me person object to the people list //


// TODO 10 configure the exit utility to fire the list's saveSync method //
exit.init( {
    exit: {actions: [people.saveSync.bind(people)]},
    sigint: {actions: [people.saveSync.bind(people)]}
});

// TODO 17 : initialize the controller, passing in the required model and views //
controller.makeContacts(people, 
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

