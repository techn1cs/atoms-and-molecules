
// Constructor. Initialization.
molecules.SlapJack = function (options) {
	this._version		= 1.0;
	
	var timex = new atoms.Timex();
	this._benchmark = timex.ticker('slapjack');
	this._benchmark.start();
	
	this._benchmark.tag('construct > suits');
	this._suits			= [
		{ name: 'Clubs', 	count: 4 },
		{ name: 'Diamonds', count: 4 },
		{ name: 'Spades', 	count: 4 },
		{ name: 'Hearts', 	count: 4 }
	];
	
	this._benchmark.tag('construct > digits');
	this._digits = [
		{ name: 'Two', 	 symbol: '2',  worth: 2,  count: 4 },
		{ name: 'Three', symbol: '3',  worth: 3,  count: 4 },
		{ name: 'Four',  symbol: '4',  worth: 4,  count: 4 },
		{ name: 'Five',  symbol: '5',  worth: 5,  count: 4 },
		{ name: 'Six', 	 symbol: '6',  worth: 6,  count: 4 },
		{ name: 'Seven', symbol: '7',  worth: 7,  count: 4 },
		{ name: 'Eight', symbol: '8',  worth: 8,  count: 4 },
		{ name: 'Nine',  symbol: '9',  worth: 9,  count: 4 },
		{ name: 'Ten', 	 symbol: '10', worth: 10, count: 4 },
		{ name: 'Jack',  symbol: 'J',  worth: 11, count: 4 },
		{ name: 'Queen', symbol: 'Q',  worth: 12, count: 4 },
		{ name: 'King',  symbol: 'K',  worth: 13, count: 4 },
		{ name: 'Ace', 	 symbol: 'A',  worth: 14, count: 4 }
	];
	
	this._playing			= false;
	this._cards 			= [];
	this._currentPlayerId 	= -1;
	this._locked			= false;
	this._playerAliases 	= []; 
	
	this.players 			= {};
	this.deck 				= new atoms.DoublyLinkedList();
	this.pile 				= new atoms.DoublyLinkedList();

	// Configuration. Options. Settings.
	this.config	= {			
		// ? output settings, error logging, cursor options?
		
		// default to computer ai players? config var for # of them to make
	};
	
	this.init();		
	this._benchmark.tag('doublylinkedlist > fromArray');
	this.deck.fromArray(this.shuffle(this.createDeck()));	
};
/*



NOTE:
Make all user cursors move outside of a boundary radius before any
card can be played? thus "evening out" the ability for each to 
slap the card if it is a jack. adds a fun element too, can't just
sit there hovering over the pile and click right when you see jack,
have to actually move your mouse to the pile. also, if you preemptively 
slap (a non-jack), maybe someting happens?




*/

molecules.SlapJack.prototype.init = function () {
	this._benchmark.tag('init');
	
	for (var i = 0; i < this._suits.length; i++) {
		this._benchmark.tag('init > suit: ' + this._suits[i].name);
		for (var j = 0; j < this._digits.length; j++) {
			this._cards.push({ 
				digit: this._digits[j].name, 
				symbol: this._digits[j].symbol,
				suit: this._suits[i].name, 
				worth: this._digits[j].worth 
			});
		}
	}	
};

molecules.SlapJack.prototype.createDeck = function (cardCount) {
	this._benchmark.tag('createDeck');
	
	if (!cardCount) cardCount = this._cards.length;
	if (!this.deck.empty()) this.reset();
	
	// error if numCards is greater than this._cards.length;
	
	var cards = this._cards;
	var destroyCount = this._cards.length - cardCount;
	var target; 
	
	if (destroyCount > 0)
		this._benchmark.tag('createDeck > destroy ' + destroyCount + ' cards');
	
	while (destroyCount) {
		cards.splice((Math.floor(Math.random() * cardCount)), 1);
		destroyCount--;
	}

	return cards;
};

molecules.SlapJack.prototype.shuffle = function (cards) {
	this._benchmark.tag('shuffle');
	
	var times = cards.length;
	var target, holder;
	
	while (times) {
		target = Math.floor(Math.random() * times);
		holder = cards[--times];
		cards[times] = cards[target];
		cards[target] = holder;
	}
	
	return cards;
};

molecules.SlapJack.prototype.addPlayer = function (alias) {
	if (!alias) {
		console.error('No player alias provided.');
		return;
	}
	
	this._playerAliases.push(alias);
	this.players[alias] = {
		name: alias,
		dead: false,
		deck: new atoms.DoublyLinkedList()
	};
};	

molecules.SlapJack.prototype.reset = function () {
	
	// reset suit and digit counts to 4
	// empty user decks
	// reset flags (dead users, currentuserid, etc)
};

molecules.SlapJack.prototype.deal = function () {
	var numberOfPlayers = this._playerAliases.length;
	var targetPlayerId = 0;
	
	this.deck.tail();
	
	for (var i = 0; i < this.deck.size(); i++) {
		this.players[this._playerAliases[targetPlayerId]].deck.push(this.deck.get());
		this.deck.down();

		targetPlayerId++;
		if (targetPlayerId == numberOfPlayers) 
			targetPlayerId = 0;
	}
	
	
};

molecules.SlapJack.prototype.go = function () {
	if (this._playing) return;
	
	this._playing = true;
	this._currentPlayerId = 0;
	// ^-- make this random? or based on # of cards dealt in hand?
	this._locked = true;
	
	for (var i = 0; i < this._playerAliases.length; i++) {
		this.players[this._playerAliases[i]].deck.tail();
	}
};

molecules.SlapJack.prototype.lay = function (playerId) {
	if (playerId < 0 || playerId > this._playerAliases.length || playerId != this._currentPlayerId)
		return;
	
	var play = this.players[this._playerAliases[this._currentPlayerId]].deck.get();
	
	console.log(this.players[this._playerAliases[this._currentPlayerId]].deck);
	
	this.players[this._playerAliases[this._currentPlayerId]].deck.down();
	
	console.log(this.players[this._playerAliases[this._currentPlayerId]].deck);
	
	this._currentPlayerId++;
	if (this._currentPlayerId == this._playerAliases.length)
		this._currentPlayerId = 0;
		
	return play;
};

molecules.SlapJack.prototype.slap = function(playerId) {
	// this.users[this._currentUser].deck.pop();
};

molecules.SlapJack.prototype.currentPlayerId = function () { return this._currentPlayerId; }


/*

array of deck
	0-52
	
	4 each (club, heart, spade, diamond) of...
		2-10
		jack 11
		queen 12
		king 13
		ace 14
		
card is random suit and random card
	must restrict so card+suit combo can only exist once
	-- for each card chosen
			remove it from the main list
			place it in a 'used' list
			

.decks[]
	.deck[user1] (and deck[user2], ..., deck[userN])
		.cards
	.pile (doublylinkedlist)
	.awaiting user hit

objects... (should this be an atom library?)

decks ... 
	deck[label]
		suits (suit[])
			cards (suit.cards[], or "all", or [])
				.blacklist (for using 'all', but excluding a few/one/handful)
	deck[label]
		...
		
suit
	value
	label
	
	
card
	value
	label
	instances allowed

*/