#!/usr/bin/env node

"use-strict";

const 
    Person = require("./model").Person,
    List = require("./util/collections").List,
    controller = require("./controller");
    
controller.init(new List('people.json', Person.deserialize));


//people.add(new Person("", "Daneille", "Shubert", "Female", "03/07/1987", "Yucaipa, California, United States"));
//people.add(new Person("", "John", "Fraboni", "Male", "05/17/1970", "North Bay, Ontario, Canada"));
