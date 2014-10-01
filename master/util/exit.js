'use-strict';

function onExit(options, err) {
    if (err) console.log(err.stack);

    var actions = options.actions;
    if (actions) {
    	for (var i = 0; i < actions.length; i++) {
    		actions[i]();
    	};
    }
};

exports.init = function(options) {
	if (!options.uncaughtException) options.uncaughtException = {actions: [process.exit]};

	process.on('exit', onExit.bind(null, options.exit));
	process.on('SIGINT', onExit.bind(null, options.sigint));
	process.on('uncaughtException', onExit.bind(null, options.uncaughtException));	

	var msg = 'Module exit initialized with ';
	for (var key in options) {
		msg += key + ', ';
	}
	console.log(msg.replace(/,\s*$/, ""));
};
