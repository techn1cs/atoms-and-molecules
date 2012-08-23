/*
(function($, window, undefined){
$.myPlugin = function(opts) {
   var defaults = {
      // setting your default values for options
   }
 
  // extend the options from defaults with user's options
  var options = $.extend(defaults, opts || {});
 
   return this.each(function(){ // jQuery chainability
     // do plugin stuff
   });
})(jQuery, window);
*/

// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {

  // window and document are passed through as local variables rather than globals
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  var wizzy = 'wizzy',
      document = window.document,
      defaults = {
        works: 'no'
      };

  // The actual plugin constructor
  function Wizzy( element, options ) {
    this.element = element;

    // jQuery has an extend method which merges the contents of two or 
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = wizzy;

    this.init();
  }

  Wizzy.prototype.init = function () {
    // Place initialization logic here
    // You already have access to the DOM element and the options via the instance, 
    // e.g., this.element and this.options
		
		// 
		// TODO manually inject the tool and editor divs
		//
		
		
		/*
		$(this.element).html(this.options.works);
		$(this.element  .attr('contenteditable', true);
		
		var w = $('#wizzyData').width();
		var h = $('#wizzyTextArea').height();
		var p = $('#wizzyTextArea').position();
				
		$('#wizzyTextArea').html(w + ' x ' + h + ' @ [' + p.left + ', ' + p.top + ']');
	
		$('body').append('<div style="position: absolute; z-index: 555; width: ' + w + 'px; height: ' + h + 'px; left: ' + p.left + 'px; top: ' + p.top + 'px; background-color: red;"> </div>');
	*/
  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[wizzy] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + wizzy)) {
        $.data(this, 'plugin_' + wizzy, new Wizzy( this, options ));
      }
    });
  }

}(jQuery, window));