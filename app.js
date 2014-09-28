#!/usr/bin/env node

'use-strict';

// TODO 4 : require the model module //
const 
    model = require('./model'),
    collections = require('./util/collections'),
    controller = require('./controller');
    
// TODO 5 : using the model factory, make a person object and print it to the console
var me = model.makePerson("Jill", "Williams", "Female", "03/07/1987", "Yucaipa, California, United States");
console.log(me);

//controller.init(collections.makeList('people.json', model.deserializePerson));

