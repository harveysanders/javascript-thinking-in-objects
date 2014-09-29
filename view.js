'use-strict';

const
    Table = require('cli-table'),
    prmpt = require("prompt"),
    deepExtend = require('deep-extend'),
    EventEmitter = require('events').EventEmitter;

var menuProperties = [
    {
      name: 'input', 
      validator: /^[1-9q]$/,
      message: 'Please select: (1) Show, (2) Add, (q) Quit',
      required: true
    }
];    

// TODO 
function makeMenu() {
    var _menu = {
        show: function() {
            prmpt.start();
            prmpt.get(menuProperties, function (err, result) {
                if (err) { return onErr(err); }
                _menu.emit('userInput', result.input);
            });
        }
    };
    deepExtend(_menu, new EventEmitter());
    return _menu;
}
module.exports.makeMenu = makeMenu;

function makeContactsView() {
    var _contactsTable = {
        show: function(contacts) {
            var table = createTable();
            var contact;
            for (var i = 0; i < contacts.values.length; i++) {
                contact = contacts.values[i];
                table.push([i+1, contact.name(), contact.email, contact.telephone, contact.gender, contact.birthDate, contact.birthPlace]);
            }
            console.log(table.toString());
        }
    }
    return _contactsTable;
}
module.exports.makeContactsView = makeContactsView;


function createTable () {
    var chars = {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
        'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚',
        'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─',
        'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│'
    };
    
    return new Table({
        head: ['No.', 'Name', 'Email', 'Telephone', 'Gender', 'D.O.B.', 'Birth Place'],
        chars: chars
    });
}

function onErr(err) {
    console.log(err);
    return 1;
}
