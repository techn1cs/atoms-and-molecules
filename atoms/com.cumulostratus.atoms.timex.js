/*
com 					= (typeof(com) != undefined) ? com : {};
com.cumulostratus		= (typeof(com.cumulostratus) != undefined) ? com.cumulostratus : {}
com.cumulostratus.atoms	= (typeof(com.cumulostratus.atoms) != undefined) ? com.cumulostratus.atoms : {}
atoms					= (typeof(atoms) != undefined) ? atoms : com.cumulostratus.atoms;
*/
// Constructor. Initialization.
atoms.Timex = function () {
	this._version	= 1.0;	// Version of the library.
	this.config		= {
		// autoStart: false // automatically start tickers when created
	}; 	// Configuration. Options. Settings.	

	this._tickers 	= {};	// Array of ticker objects.
	//this.tags = {};	// ... set on all tickers,  at the specified interval/time ... useful?

};

atoms.Timex.prototype.ticker = function (tickerId) {
	if (!tickerId) {
		console.error('No id provided for ticker creation/retrieval.');
		return;
	}
	
	if (!this._tickers[tickerId]) {
		var timexInstance = this;
		var ticker = {
			_id: 		tickerId,
			_stamps: 	{
				start: 0,
				stop:  0
			},
			_tags: 		{},
			_laps: 		[],
			_ticking: 	false,
			_paused: 	false,
			_locked:  	false,
			//
			start: 	 function() 	 { timexInstance.start(this._id); },
			stop: 	 function() 	 { timexInstance.stop(this._id); },
			pause: 	 function() 	 { timexInstance.pause(this._id); },
			resume:  function() 	 { timexInstance.resume(this._id); },
			tag: 	 function(tagId) { timexInstance.tag(this._id, tagId); },
			lap: 	 function()   	 { timexInstance.lap(this._id); },
			ticking: function()  	 { return this._ticking; }
			//lock: 	function() { timexInstance.start(this._id); },
			//dump: 	function() { timexInstance.start(this._id); },
			//destroy:  function() { timexInstance.start(this._id); }
		};
	
		this._tickers[tickerId] = ticker;
	}
	
	return this._tickers[tickerId];
};

// for start and stop, check for locked, pausing, whatever logic.. .right now does nothing

atoms.Timex.prototype.start = function (tickerId) {
	if (!this._tickers[tickerId]) {
		console.error('No ticker with id "' + tickerId + '" exists.');
		return;
	}
	
	console.log(this._tickers[tickerId]);
	
	if (this._tickers[tickerId].ticking()) {
		console.log('Ticker "' + tickerId + '" is already ticking.');
		return;
	}
	
	// for now, starting a ticker just adds a new lap..?
	this._tickers[tickerId]._ticking = true;
	this._tickers[tickerId]._stamps.start = Date.now(); //._laps.push({ start: Date.now(), stop: 0 });
};

atoms.Timex.prototype.stop = function (tickerId) {
	if (!this._tickers[tickerId]) {
		console.error('No ticker with id "' + tickerId + '" exists.');
		return 0;
	}
		
	if (!this._tickers[tickerId].ticking()) {
		console.log('Ticker "' + tickerId + '" isn\'t ticking.');
		return 0;
	}
	
	this._tickers[tickerId]._stamps.stop = Date.now();
	this._tickers[tickerId]._ticking = false;

	var msDuration = this._tickers[tickerId]._stamps.stop - this._tickers[tickerId]._stamps.start;
	
	return msDuration;
};

atoms.Timex.prototype.tag = function (tickerId, tagId) {
	if (!this._tickers[tickerId]) {
		console.error('No ticker with id "' + tickerId + '" exists.');
		return;
	}
	
	if (!this._tickers[tickerId].ticking()) {
		console.log('Ticker "' + tickerId + '" isn\'t ticking.');
		return;
	}
	
	if (this._tickers[tickerId]._tags[tagId])
		console.log('Tag "' + tagId + '" already exists. Overwriting.');
	
	this._tickers[tickerId]._tags[tagId] = Date.now();
};

atoms.Timex.prototype.getTag = function (tickerId, tagId) {
	if (!this._tickers[tickerId]) {
		console.error('No ticker with id "' + tickerId + '" exists.');
		return;
	}
	
	if (!this._tickers[tickerId]._tags[tagId]) {
		console.warn('No tag by id "' + tagId + '" exists on ticker "' + tickerId + '"');
		return;
	}
	
	return this._tickers[tickerId]._tags[tagId];
};

/*

Timex
subclass Ticker

Timex.ticker(id) // returns new ticker, or existing ticker if 'id' already exists
Timex.ticker(id).sub(id) // creates new sub-ticker, or returns existing subticker
^--- supports infinite nested tickers... each parent has a sub-average and sumation? 

ticker.start
ticker.stop
ticker.mark
ticker.sub(id) // this._subs[id] = new Ticker(...)
ticker.exec(func, interval) // executes func every interval ms. or interval could be "when ticker reaches X time"


*/

