Thinking in Objects
==================================

A lesson set on objects, how they are modeled within apps in JavaScript and Node.js

### Setup

Create a new Cloud9 workspace for Node.js

1. From your Cloud9 Dashboard, find in the upper left corner and click the green button, "Create New Workspace".
2. Select "Clone From URL".
3. In the "Soure URL" form input, copy and paste in the following URL:
        https://github.com/jfraboni/javascript-thinking-in-objects.git
4. In the environment selection box, select "Node.js".
5. Finally, click the green button "Create".

Nice, you're in business...

#### Thinking in Objects

Alrighty then, when it comes to building apps, programs or systems, you want to start thinking in terms of the objects that make up those apps or systems, and how they interact with each other.


When you think in terms of objects, you're thinking in terms of <a href="http://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank">Object Oriented Programming (OOP)</a>, and in OOP, the words datatype and object are synonomus, in the sense of asking: with what _type_ of object are we dealing?

When we model the datatype or objects that make up an app, we can think of modeling objects the same way we would with real objects in the real world, that is, what the objects are made of, and what they can do.

Before we can create an object of a particular type, we must design the object, that is, define its properties and behaviours.  We can compare this to the process of designing a car or anything that we manufacture: First we need a blueprint or a schematic, then we need some kind of constructor or factory that creates the objects from our blueprint.

In most computer languages that support OOP, we have some sort of constructor mechanism, normally a function that we define, and when invoked, initializes and returns an instance of our custom type of object.

Get use to the term _instance_, you'll be using it often when discussing your work, and it generally refers to an object of a particular type that _is now in existence_.  A blueprint or a Class are abstract, they refer to the _concept_ of a type of object, whereas an instance _is_ the object.

To invoke a constructor of a Class, most languages use the keyword _new_, as in `var myCar = new Car("red");`.  In this example, we've created an instance of a car, passing in the String "red" to its constructor function, presumably the color of the car, and we've assigned it to a 

In fact, although there's little reason to do so, all built-in or primative objects in JavaScript, like Numbers and Strings, can be built using their constructors:

```javascript
var num = new Number(1);
console.log(num.valueOf()); // prints: 1
var str = new String("OMG, I'm a String");
console.log(str.valueOf()); // prints: OMG, I'm a String
```

Static languages, like Java, include a Class Object, an actual type of object, more formally allowing us to define a type of object, grouping together the properties and behaviours that define a type of object.  JavaScript, not so much.  

####And the Winner Is... Factories

In JavaScript, there's several means of constructing custom objects, <a href="http://pivotallabs.com/javascript-constructors-prototypes-and-the-new-keyword/" target="_blank">like using constructor functions and the new keyword, and adding methods to an object definition via the constructor Function prototype</a>, and each has a slew of techniques for making `this` behave the way we want.

For the sake of universality, usability and simplicity, we're going to recommend, loosely, the use of the factory pattern to create objects.

Have a read of <a href="http://togakangaroo.github.io/2014/04/29/on-this-and-new.html" target="_blank">George Mauer's article on this and new</a>.

A factory is simply a function that we define, that when invoked, _initializes_ and returns an instance of our custom type of object.  There's many benefits to using factories over constructors and prototypes in JavaScript, namely, we can encapsulate state, and we can avoid the ambiguity of the `this` keyword.  Don't worry too much about these concepts for now, they will make sense to you as get your hands in the clay; for now, factories are your friends!

### Lesson Steps

In this project, we're gonna build out a little _contacts_ app that reads and writes our contact information to and from the fiesystem.

In doing so, we'll also touch on modularization, facilitating better oranization of our app, addressing <a href="http://en.wikipedia.org/wiki/Separation_of_concerns" target="_blank">a seperation of concerns</a>.  The concept is we divide our app into seperate objects or modules, each module responsible for one thing and one thing only, the same way a car is made up of... you get the point.

To begin, we'll model a person object, because that is the datatype our contacts app will manage.  Many apps, including Facebook, model users in this way.  In fact, to illustrate, open a new tab in your browser, login to Facebook, click on your own profile to open your profile page, then, in the browser's url address bar, replace the `www` in `https://www.facebook.com/john.fraboni` with `graph` as in:

    https://graph.facebook.com/john.fraboni
    
Press enter, and... voilà (that's Québécois for "there you have it!"):

```javascript
{
	"id": "123456789",
	"first_name": "John",
	"gender": "male",
	"last_name": "Fraboni",
	"link": "https://www.facebook.com/john.fraboni",
	"locale": "en_US",
	"name": "John Fraboni",
	"username": "john.fraboni"
}
```

Here you are, represented in JavaScript Object Notation (JSON), that is, you modeled as data.

Get use the the term _model_; it's another word you'll use a lot to describe the thing with which your app is dealing.  "What's the model?", is essentially asking, "What's our data?".

One of the <a href="http://en.wikipedia.org/wiki/Software_design_pattern" target="_blank">design patterns</a> used frequently to cleanly organize sections of an application is called <a href="http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">Model View Controller (MVC)</a>:

The _model_ is the tier of the app that manages data, its access and storage, the _view_ is the part of the app responsible for displaying the model, our data, to the user, and the _controller_ handles user input from the view and manipulates data in order to present it to the user or prepare it for persistance, that is, storage on a filesystem.

Our contacts app will model people as objects, and we'll even <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" target="_blank">serialize them to JSON</a> to persit the data on the filesystem.  We'll create a seperate module, called _model.js_ to act as the model tier of our simple app.

**TODO 1** : Open the model.js file, and create a factory function that initializes a _person_ type of Object.  The Person type of Object will hold all of the properties and behaviours of 



```javascript
'use-strict';

// TODO 1 : create the makePerson factory //
function makePerson(firstName, lastName, email, telephone, gender, birthDate, birthPlace) {
    var _person = {
        firstName:  firstName,
        lastName:   lastName,
        email:      email,
        telephone:  telephone,
        gender:     gender,
        birthDate:  birthDate,
        birthPlace: birthPlace,
        
        name:       function() { return _person.firstName + ' ' + _person.lastName; }
    };
    return _person;
};
```

The `makePerson()` function takes several parameters, `firstName`, `lastName`, etc, that we assign to the properties of the same name of the newly created `_person` object.  We also define a method, a function called `name` that concatenates and returns the `firstName` and `lastName` Strings of the `_person` object; essentially a convenience behaviour of the model, so that everytime we want to display the full name of the person, we don't have to repetitiously, manually concatenate these two values.  

Note the use of the underscore that prefixes the word person: `_person`.  This is a convention used often to mark properties as `private`, that is, not intended to be visiable or used outside of the scope of the current object.  As George mentioned in his post, referenced above:

    I like an underscore prefix to indicate "this is what I'm buiding here"

Dig this:  The `_person` object is simply an associative array!  That's right, just a container of key/value pairs that will _treat_ as a person, essentially because it http://haacked.com/archive/2014/01/04/duck-typing/acts like one, for our purposes anyway.

**TODO 2** : Alrighty, because we're building a little Node.js command-line utility, let's expose our person model factory as a module.  In the Node.js environment, modules are objects that encapsulate their concerns, that is, hide their inner workings from outside clients, and expose an API through an `exports` object on the `module` object. So, in order for us to access our person factory, we need to export it:

```javascript
// TODO 2 : expose the makePerson factory //
module.exports.makePerson = makePerson;
```

While we're at it, let's set up a deserialize method, a function that knows how to read a plain JavaScript object containing person data, resusatated from JSON, and plugin that data to our factory method, creating a person object complete with its methods.

This deserialize method will allow other objects to use our person datatype without having to know too much about _how_ to create it.  This is called _decoupling_, and it's a very important concept of code organization and OOP.

```javascript
// TODO 3 : create the deserializePerson method and expose it //
module.exports.deserializePerson = function (data) {
    return makePerson(data.firstName, data.lastName, data.email, data.telephone, data.gender, data.birthDate, data.birthPlace);
}
```

Ok, we're done with the model module!

Let's make some people!

**TODO 4** :

```javascript
// TODO 4 : require the model module //
const 
    model = require('./model');
```

Cool, we've now imported the model module into our app!  <a href="http://nodejs.org/api/modules.html" target="_blank"></a>There's a more to learn about Node.js modules, there definitions and importations, but that's the basics!

Let's test out our person factory:

```javascript
var me = model.makePerson("Jill", "Williams", "Female", "03/07/1987", "Yucaipa, California, United States");
console.log(me);
```

**Run the App!** : In Cloud9, with the app.js file selected, from the menu bar, click the green _run_ button.  Or, from the Bash prompt, type `./app.js:

    $ ./app.js
    { firstName: 'Jill',
      lastName: 'Williams',
      email: 'Female',
      telephone: '03/07/1987',
      gender: 'Yucaipa, California, United States',
      birthDate: undefined,
      birthPlace: undefined,
      name: [Function] }

Magic!  Using the factory method of our person model module, we created a person object.  Triple A!

Note how all of the code for the creation of our person model is encapsulated in the model module, leaving our main app.js file nice and clean!  This also means we can re-use the model module and its code anywhere we want!  This is a powerful feature of modularity.

