'use-strict';

const
    Table = require('cli-table'),
    prmpt = require("prompt"),
    deepExtend = require('deep-extend'),
    EventEmitter = require('events').EventEmitter;


// TODO 
function makeMenu(message, validator) {
    var menuProperties = [
        {
          name: 'input', 
          required: true
        }
    ];
    
    if (message) {
        menuProperties[0].message = message;
    }
    if (validator) {
        menuProperties[0].validator = validator;
    }
    
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

function makeTable(headers) {
    var _table = {
        show: function(values) {
            var table = createTable(headers);
            table.push.apply(table, values);
            console.log(table.toString());
        }
    }
    return _table;
}
module.exports.makeTable = makeTable;


/**
 * Takes an Array of String to serve as the table headers.
 */
function createTable (headers) {
    var chars = {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
        'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚',
        'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─',
        'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│'
    };
    
    return new Table({
        head: headers,
        chars: chars
    });
}

function onErr(err) {
    console.log(err);
    return 1;
}
