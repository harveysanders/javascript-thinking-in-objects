"use-strict";

const 
    fs = require('fs'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var List = function(filepath, deserialize) {
    this.filepath = filepath;
    this.deserialize = deserialize;
    this.list = [];
};
util.inherits(List, EventEmitter);

List.prototype.add = function (item) {
    this.list.push(item);
    return this.list.length;
};

List.prototype.remove = function (item) {
    var index = this.list.indexOf(item);
    if (index) {
        return this.list.splice(index, 1)[0];
    }
    return null;
};

List.prototype.save = function () {
    var self = this;
    fs.writeFile(this.filepath, serialize(this.filepath, this.list), function (err) {
        if (err) throw err;
        console.log('List.save: List saved');
        self.emit('saved');
    });
};

List.prototype.load = function (filepath) {
    var self = this;
    filepath = filepath ? filepath : this.filepath;
    fs.exists(filepath, function (exists) {
        if (exists) {
        fs.readFile(filepath, function (err, data) {
                if (err) console.log(err);
                var parsed;
                try {
                    parsed = JSON.parse(data);
                } catch (err) {
                    console.log('List.load > fs.fileRead : There was an error parsing JSON data:');
                    console.log(err);
                }
                if (parsed) {
                    for (var i = 0; i < parsed.length; i++) {
                        self.list.push(self.deserialize(parsed[i]));
                    }
                }
                self.emit('loaded');
            });     
        } else {
            console.log('List.load: No file found at %s', filepath);
            self.emit('loaded');
        }
    });
};

List.prototype.saveSync = function () {
    fs.writeFileSync(this.filepath, serialize(this.filepath, this.list));
    console.log('List.saveSync: saved synchronously');
};

function serialize(filepath, object) {
    const extension = /\.[0-9a-z]+$/i.exec(filepath)[0];
    var serialized;
    switch(extension) {
        case ".json":
            serialized = JSON.stringify(object);	
            break;
        case ".cvs":
            // TODO add cvs serialization //
            //serialized = 
            console.warn('cvs serialization not implemented');
            break;
        default:
            console.log('serialize: %s is an unrecognized extension. Falling back on JSON pretty-printed!', extension);
            serialized = JSON.stringify(object, undefined, 2);
            break;
    }
    return serialized;
}

exports.List = List;