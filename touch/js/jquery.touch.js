/**
 * touch for jQuery
 * 
 * Copyright (c) 2008 Peter Schmalfeldt (ManifestInteractive.com) <manifestinteractive@gmail.com>
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details. 
 *
 * @license http://www.gnu.org/licenses/gpl.html 
 * @project jquery.touch
 */



(function($){
	jQuery.fn.touch = function(settings, callbacks) {
		
		// DEFINE DEFAULT VARIABLES
		var _target	= null,  
		_rotate		= null
		_rotating	= 0, 
		_width	= 0, 
		_height	= 0, 
		_left	= 0, 
		_top	= 0, 
		_xspeed	= 0, 
		_yspeed	= 0,
		_dragging = false, 
		_sizing	= false
		_target = null,
		_zindex = 1000;
		
		// DEFINE DEFAULT TOUCH SETTINGS
		var optsDefault = {
			animate: true,
			sticky: false,
			dragx: true,
			dragy: true,
			rotate: false,
			resort: true,
			scale: false
		}
		
		var callbacksDefault = {
			touchStart : function (e){},			
			touchMove :function (e){},
			touchEnd : function (e){},			
			gestureStart : function (e){},			
			gestureChange : function (e){},
			gestureEnd : function (e){}
		}
		
		var opts = jQuery.extend({},optsDefault, settings);
		callbacks = jQuery.extend({},callbacksDefault, callbacks);
	
		// ADD METHODS TO OBJECT
		this.each(function(){
			opts = opts;
			this.ontouchstart	= touchStart;
			this.ontouchend		= touchEnd;
			this.ontouchmove	= touchMove;
			this.ongesturestart = gestureStart;
			this.ongesturechange = gestureChange;
			this.ongestureend	= gestureEnd;
		});
	
	
		function touchStart(e){
			_target = this;
			_xspeed = 0;
			_yspeed = 0;

			$(e.changedTouches).each(function(){

				var curLeft = ($(_target).css("left") == 'auto') ? this.pageX : parseInt($(_target).css("left"));
				var curTop	= ($(_target).css("top") == 'auto') ? this.pageY : parseInt($(_target).css("top"));

				if(!_dragging && !_sizing){
					_left = (e.pageX - curLeft);
					_top = (e.pageY - curTop);
					_dragging = [_left,_top];
					if(opts._resort){
						_zindex = ($(_target).css("z-index") == _zindex) ? _zindex : _zindex+1;
						$(_target).css({
							zIndex: _zindex
						});
					}
				}
			});
			callbacks['touchStart'](e,_target);
		};
	
		function touchMove(e){

			if(_dragging && !_sizing && opts.animate) {

				var _lastleft = (isNaN(parseInt($(_target).css("left")))) ? 0 : parseInt($(_target).css("left"));
				var _lasttop = (isNaN(parseInt($(_target).css("top")))) ? 0 : parseInt($(_target).css("top"));
			}

			$(e.changedTouches).each(function(){

				e.preventDefault();

				_left	= (this.pageX-(parseInt($(_target).width())/2));
				_top	= (this.pageY-(parseInt($(_target).height())/2));

				if(_dragging && !_sizing) {

					if(opts.animate){
						_xspeed = Math.round((_xspeed + Math.round( _left - _lastleft))/1.5);
						_yspeed = Math.round((_yspeed + Math.round( _top - _lasttop))/1.5);
					}

					if(opts.dragx || opts.dragy) $(_target).css({
						position: "absolute"
					});
					if(opts.dragx) $(_target).css({
						left: _left+"px"
					});
					if(opts.dragy) $(_target).css({
						top: _top+"px"
					});

					callbacks['touchMove'](e,_target);
				}
			});
		};
		
		function touchEnd(e){
			$(e.changedTouches).each(function(){
				if(!e.targetTouches.length){
					_dragging = false;
					if(opts.animate){
						_left = ($(_target).css("left") == 'auto') ? this.pageX : parseInt($(_target).css("left"));
						_top = ($(_target).css("top") == 'auto') ? this.pageY : parseInt($(_target).css("top"));

						var animx = (opts.dragx) ? (_left+_xspeed)+"px" : _left+"px";
						var animy = (opts.dragy) ? (_top+_yspeed)+"px" : _top+"px";

						if(opts.dragx || opts.dragy) $(_target).animate({
							left: animx, 
							top: animy
						}, "fast");
					}
				}
			});

			callbacks['touchEnd'](e,_target);
		};
		
		function gestureStart(e){
			_sizing = [$(this).width(), $(this).height()];
			callbacks['gestureStart'](e,_target);
		};
		
		function gestureChange(e){
			if(_sizing){
				_width = (opts.scale) ? Math.min(parseInt(_sizing[0])*e.scale, 300) : _sizing[0];
				_height = (opts.scale) ? Math.min(parseInt(_sizing[1])*e.scale, 300) : _sizing[1];
				_rotate = (opts.rotate) ? "rotate(" + ((_rotating + e.rotation) % 360) + "deg)" : "0deg";		
				$(this).css({
					width: _width+"px", 
					height: _height+"px", 
					webkitTransform: _rotate
				});
				callbacks['gestureChange'](e,_target);
			}
		};
		
		function gestureEnd(e){
			_sizing = false;
			_rotating = (_rotating + e.rotation) % 360;
			callbacks['gestureEnd'](e,_target);
		};
	};
})(jQuery)