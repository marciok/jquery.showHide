/*
	Marcio Klepacz
	marcioklepacz@gmail.com
*/

(function($){

  	$.fn.showHide = function( options , callBack ) {
	
		// Default setup
		var settings =	{
			navClass: 'tab',
			navSelClass: 'selected',
			contentClass: 'content',
			selOnParent : false,
			fx: false// WARNING NOT DONE YET !!!
		};
	
		return this.each(function() {        
			// If options exist, lets merge them with our default settings
			if ( options ) { $.extend( settings, options );}
	
			//Variables
			var _nav	  = $(this).children();
			var _contents = $('.'+settings.contentClass);
			var _navC	  = settings.navClass;
			var _navSel   = settings.navSelClass;
			var _parentC  = settings.selOnParent;
			var _contentIndex = [];
			var _efx = settings.fx;
		
			// conditon to verify if the elements have the same length 
			if (_contents.length === 0 || _nav.length === 0 || _nav.length !== _contents.length ) {
				//if not
				console.log('The number of tabs has to be the same number of contents');
				return false;
			}
	
			//Add class for the navigation and the contents
			$.each(_nav, function(i){
				$(this).addClass(_navC+'-'+(i+1));
			});
	
			$.each(_contents, function(i){
				contentsClass = $(this).attr('class');
				$(this).removeClass();
				contentsClass = contentsClass+'-'+(i+1);
				_contentIndex[i+1] = $(this).addClass(contentsClass);
			});
	
			//Hiding all content elements
			_contents.hide();
	
			//re factor line below :
			if (_parentC === true) {
				var startIndex = $('.'+_navSel,this).attr('class').match(/[0-9].*/);
				$('.'+settings.contentClass+'-'+startIndex).show();
			} else {
				var startIndex = $(this).children().children('.'+_navSel).parent().attr('class').match(/[0-9].*/);
				$('.'+settings.contentClass+'-'+startIndex).show();
			};
	
			//Click action
			_nav.children('a').click(function(){
				
				if (_parentC === true) {
					if ($(this).parent().hasClass(_navSel)) {
						return false;
					};
				} else {
					if ($(this).hasClass(_navSel)) {
						return false;
					};
				}
					
				
				indexTrg = $(this).parent().attr('class').match(/[0-9].*/);
				if ( _efx === true) {
					$.each(_contentIndex, function(i){
						$(_contentIndex[i]).fadeOut();
					});
					_contentIndex[indexTrg].fadeIn();
					
				}else {
					$.each(_contentIndex, function(i){
						$(_contentIndex[i]).hide();
					});
					_contentIndex[indexTrg].show();
				};

				
				 if (_parentC === true) {
					$(this).parent().addClass(_navSel);
					_nav.not($(this).parent()).removeClass(_navSel);
				 } else {
					$(this).addClass(_navSel);
					 _nav.children().not($(this)).removeClass(_navSel);
				 };
							
				if (callBack !== undefined) {
					callBack();
				};

				return false;
			});
		
		});
	
  };

})( jQuery );