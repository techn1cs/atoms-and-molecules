
// Constructor. Initialization.
atoms.DoublyLinkedList = function (options) {
  this._version   = 1.0;

  this._head      = null; // Pointer to the head (first) node.
  this._tail      = null; // Pointer to the tail (last) node.
  this._length    = 0;    // Length of the list.
  
  this._cursor    = {     // Movable pointer to the "current" node.
    node: null,
    position: 0
  };
  
  this.config     = {     // Configuration. Options. Settings.
    // ? output settings, error logging, cursor options?
  };
  
  // node
  //  internal id (_nid) ?
  //   data object
  //   previous node
  //   next node
  
};



// Remove ('pop') the current tail node.

atoms.DoublyLinkedList.prototype.pop = function () { 
  if (this.empty()) return;
  
  // Store the cursor's current location.
  var originalCursorPosition = this._cursor.position;
  
  // Jump the cursor to the tail.
  if (!this.atTail()) this.tail();
  
  // Remove the tail (cursor's node).
  this.remove();
  
  // Jump the cursor back to it's original position.
  this.jump(originalCursorPosition);  
};

// Remove the node at the cursor's current position.
atoms.DoublyLinkedList.prototype.remove     = function () {
  // Empty list.
  if (this.empty()) return;
  
  // Single-node list.
  if (this.singular()) {
    // Nullify the list.
    this._head = null;
    this._tail = null;
    this._cursor.node = null;
    this._cursor.position = 0;
  }
  // Multiple-node list.
  else {
    // Removing the head.
    if (this.atHead()) {
      this._head = this._head.next;
      this._head.previous = null;
      this._cursor.node = this._head;
    }
    // Removing the tail.
    else if (this.atTail()) {
      this._tail = this._tail.previous;
      this._tail.next = null;
      this._cursor.node = this._tail;
      this._cursor.position--;
    }
    // Removing the cursor's attached node.
    else {
      var drop = this._cursor.node;
      drop.previous.next = drop.next;
      drop.next.previous = drop.previous;
      this._cursor.node = drop.next;
    }
  }
  
  // Shrink.
  this._length--;
};

// ^-- to remove one at another location, just require them to jump the cursor first? or
// they provide the index [i.e. remove(12);] and we do .jump() and .remove() then .jump()back?


atoms.DoublyLinkedList.prototype.add  = function (nodeData) { this.push(nodeData); };
atoms.DoublyLinkedList.prototype.push = function (nodeData) {
  if (!nodeData) return;
  
  var node = {
    //_nid: null,
    next: null,
    previous: null,
    data: nodeData
  };
  
  // Empty node list.
  if (this.empty()) {
    this._head = node;
    this._tail = node;
  }
  // Single-node list.
  else if (this.singular()) {
    node.previous = this._head;
    node.next = null;
    this._tail = node;
    this._head.next = node;
  }
  // Multi-node list.
  else {
    node.previous = this._tail;
    this._tail.next = node;
    this._tail = node;
  }
  
  this._length++;
  this._cursor.position++;
  this._cursor.node = node;
};


// Insert a node before the cursor's position.
atoms.DoublyLinkedList.prototype.insert       = function (nodeData) { this.insertBefore(nodeData); };
atoms.DoublyLinkedList.prototype.insertBefore = function (nodeData) {
  if (!nodeData) return;
  
  var node = {
    next: null,
    previous: null,
    data: nodeData
  };
  
  // Empty list, so insertion simply calls the .add method.
  if (this.empty()) {
    this.add(nodeData);
    return;
  }
  // Special case for pre-head insertion request.
  else if (this.atHead()) {
    // Point new head <-> old head.
    this._head.previous = node;
    node.next = this._head;
    // Replace local _head pointer.
    this._head = node;
  }
  // Normal insertion.
  else {
    // Modify new node and cursor node pointers.    
    this._cursor.node.previous.next = node;
    node.previous = this._cursor.node.previous;   
    this._cursor.node.previous = node;
    node.next = this._cursor.node;
  }
  
  console.log(this._cursor);
  
  this._length++;
  
  // Move the cursor forward to account for the added node.
  this._cursor.position++;
};

// Insert a node after the cursor's position.
atoms.DoublyLinkedList.prototype.insertAfter = function (nodeData) {
  if (!nodeData) return;
  
  var node = {
    next: null,
    previous: null,
    data: nodeData
  };
  
  // Empty list.
  if (this.empty()) {
    this.add(nodeData);
    return;
  }
  // Special case for post-tail insertion request.
  else if (this.atTail()) {
    // Point old tail <-> new tail.
    this._tail.next = node;
    node.previous = this._tail;
    // Replace local _tail pointer.
    this._tail = node;
  }
  // Normal insertion.
  else {
    // Modify new node and cursor node pointers.
    this._cursor.node.next.previous = node;
    node.next = this._cursor.node.next;
    node.previous = this._cursor.node;
    this._cursor.node.next = node;
  }
  
  this._length++;
};


// replace
atoms.DoublyLinkedList.prototype.replace = function (nodeData) {
  if (this.empty() || !nodeData) return;

  this._cursor.node.data = nodeData;
};

// swap


// flip/reverse



///////////////////////////////////////

// MOVEMENT & TRAVERSAL

// Move the cursor to the next node in the list.
atoms.DoublyLinkedList.prototype.right  = function () { this.next(); }
atoms.DoublyLinkedList.prototype.up   = function () { this.next(); }
atoms.DoublyLinkedList.prototype.next   = function () {
  // Either we're empty, or we're at the end of the list.
  if (this.empty() || this.atTail()) return;
  
  // Adjust the cursor.
  this._cursor.node = this._cursor.node.next;
  this._cursor.position++;
};

// Move the cursor to the previous node in the list.
atoms.DoublyLinkedList.prototype.left     = function () { this.previous(); }
atoms.DoublyLinkedList.prototype.down   = function () { this.previous(); }
atoms.DoublyLinkedList.prototype.previous = function () {
  // At the start of the list.
  if (this.empty() || this.atHead()) return;
  
  // Adjust the cursor.
  this._cursor.node = this._cursor.node.previous;
  this._cursor.position--;
};

// TODO Implement .seek() .. could either alias jump, or could "seek" forward or backward, by arg
//          .seek(-5) -- go left, .seek(3) go forward

// Move the cursor to a specific position (by index).
atoms.DoublyLinkedList.prototype.moveTo = function (pos) { this.jump(pos); }
atoms.DoublyLinkedList.prototype.jump   = function (pos) {
  if (this.empty()) return;
  
  // Position is out of bounds/invalid.
  if (pos <= 0 || pos > this._length) return;
  // TODO error hadnling at all?...
  
  // Cursor is already there.
  if (this._cursor.position === pos) {
    return;
  }
  // Cursor is to the left of the position.
  else if (this._cursor.position < pos) {
    do 
      {
      this.next();
      } 
    while (this._cursor.position != pos);
  }
  // Cursor is to the right of the position.
  else if (this._cursor.position > pos) {
    do
      {
      this.previous();
      }
    while (this._cursor.position != pos);
  }
  
  if (this._cursor.position !== pos) return;
  // TODO error handling -- something went terribly wrong.
  // we'll be in an endless loop until now anyway. lol.
};

// Move the cursor to the head node.
atoms.DoublyLinkedList.prototype.head = function () {
  // Empty list, or already at the head.
  if (this.empty() || this.atHead()) return;
  
  // Adjust the cursor.
  this._cursor.node = this._head;
  this._cursor.position = 1;
};

// Move the cursor to the tail node.
atoms.DoublyLinkedList.prototype.tail = function () {
  // Empty list, or already at the tail.
  if (this.empty() || this.atTail()) return;
  
  // Adjust the cursor.
  this._cursor.node = this._tail;
  this._cursor.position = this._length;
};



///////////////////////

// toArray
// fromArray

atoms.DoublyLinkedList.prototype.toArray = function () {
  if (this.empty()) return;
  
  var output = [];
  this.head();
  output.push(this.get());
  
  while (!this.atTail()) {
    this.next();
    output.push(this.get());
  }
  
  return output;  
};

atoms.DoublyLinkedList.prototype.fromArray = function (source) {
  for (var i = 0; i < source.length; i++) {
    this.push(source[i]);
  }
};


////////////////////////

// search

// get (retrieves data object on current node)
// allow a getAt(i)? performs .jump(i) then .get()
atoms.DoublyLinkedList.prototype.get = function (target) {
  if (this.empty() || !this._cursor.node) return null;
  
  if (!target) return this._cursor.node.data;
  
  if (target == 'head') return this._head.data;
  
  if (target == 'tail') return this._tail.data;
};

atoms.DoublyLinkedList.prototype.getRaw = function () {
  if (this.empty() || !this._cursor.node) return null;
  
  return this._cursor.node;
};

atoms.DoublyLinkedList.prototype.getId = function () {
  //return this._cursor._nid;
};

// dump -- json dump of entire list

////////////////////////

atoms.DoublyLinkedList.prototype.clear = function () {
  if (this.empty()) return;
  
  this.tail();
  
  do
  {
    this.remove();    
  }
  while (!this.empty())
};



atoms.DoublyLinkedList.prototype.atHead = function () {
  return (this._cursor.position === 1);
};

atoms.DoublyLinkedList.prototype.atTail = function () {
  return (this._cursor.position === this._length);
};

atoms.DoublyLinkedList.prototype.empty = function () {
  return (this._length <= 0);
};

atoms.DoublyLinkedList.prototype.singular = function () {
  return (this._length === 1);
};

atoms.DoublyLinkedList.prototype.size = function () {
  return (this._length);
};



//////////////////////////////////////////////////////////////////////////////.
//////////////////////////////////////////////////////////////////////////////.
////                                  ////.
////  Initialization                          ////.
////                                  ////.
////////////////////////////////////////////////////////////////////////////////////////////.
////////////////////////////////////////////////////////////////////////////////////////////.

/**
 *  Initializes necessary variables for the class.
 *
 *  Worth noting that the 'node' object is structured as:
 *    node {
 *      data: object,   data/data the node holds
 *      next: node,     pointer to next node
 *      prev: node      pointer to previous node 
 *    }
 *
 *  @param options object     Set of specific options (TBD)
 */






////////////////////////////////////////////////////////////////////////////////////////////.
////                                          ////.
////  Modification of Nodes                             ////.
////                                          ////.
////////////////////////////////////////////////////////////////////////////////////////////.
////////////////////////////////////////////////////////////////////////////////////////////.

//******************************************************************************************
//  Cursor Aliases (calls modification functions below, using the cursor's position)
//******************************************************************************************


