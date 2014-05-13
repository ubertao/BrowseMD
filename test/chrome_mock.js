var chrome = {
	extension: {
		getURL: function (path) { return 'qunit://' + path; }
	},
	runtime: {
		onMessage: {
			addListener: function (callback) { return callback; }
		},
		sendMessage: function (message) { return message; }
	},
	tabs: {
		query: function(q, callback) { callback( [ {id:0} ] ); }
	}
};