"use-strict";

const 
	fs = require('fs'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

List = function(filename) {
	this.filename = filename;
	this.list = [];
}
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
	fs.writeFile(this.filename + '.json', JSON.stringify(this.list), function (err) {
        if (err) throw err;
        console.log('List saved');
        this.emit('saved');
    });
};

List.prototype.load = function (filename) {
	var self = this;
	filename = filename ? filename : this.filename;
	fs.readFile(filename, function (err, data) {
  		if (err) console.log(err)
  		self.list = JSON.parse(data);
  		self.emit('loaded');
	});
};

List.prototype.saveSync = function () {
	fs.writeFileSync(this.filename + '.json', JSON.stringify(this.list));
	console.log('List saved synchronously');
};

exports.List = List;
