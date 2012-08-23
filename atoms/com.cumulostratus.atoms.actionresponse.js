
com 										= {};
com.cumulostratus				= {};
com.cumulostratus.atoms	= {};
atoms										= com.cumulostratus.atoms;

// Constructor. Initialization.
atoms.ActionResponse = function () {
	this._version		= 1.0;
	
	this._err				= {
		code: -1,
		message: '',
		
	};
	
	this._state			= true;
	
	this.config			= {			// Configuration. Options. Settings.
		// ? output settings, error logging, cursor options?
	};
	

};

atoms.ActionResponse.prototype.fail = function () { 
	// this could be caused by an event triggered?
	
	// i.e., attempt ajax yadaa.. on success xyz, else ActionResponse.fail(errCode)
};

// this is all retarded.

