/*
* EASYDROPDOWN - A Drop-down Builder for Styleable Inputs and Menus
* Version: 1.1
* License: Creative Commons Attribution 3.0 Unported - CC BY 3.0
* http://creativecommons.org/licenses/by/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2013 Patrick Kunka, All Rights Reserved
*/


(function($){
	
	function EasyDropDown(){
		this.isField = true,
		this.down = false,
		this.inFocus = false,
		this.cutOff = false,
		this.hasLabel = false,
		this.wrapperClass = 'dropdown',
		this.onSelect = null;
	};
	
	EasyDropDown.prototype = {
		constructor: EasyDropDown,
		instances: [],
		init: function(domNode, settings){
			var self = this;
			
			$.extend(self, settings);
			self.$select = $(domNode);
			self.options = [];
			self.isTouch = 'ontouchend' in document;
			self.$select
				.removeClass(self.wrapperClass)
				.find('option')
				.each(function(i){
					var $option = $(this);
					if($option.is(':selected')){
						self.selected = {
							index: i,
							title: $option.text()
						}
						self.focusIndex = i;
					};
					if($option.hasClass('label') && i == 0){
						self.hasLabel = true;
					} else {
						self.options.push({
							domNode: $option[0],
							title: $option.text(),
							value: $option.val(),
							selected: $option.is(':selected')
						});
					};
				});
			self.render();
		},
	
		render: function(){
			var self = this,
				touchClass = self.isTouch ? ' touch' : '';
			
			self.$container = self.$select.wrap('<div class="'+self.wrapperClass+touchClass+'"/>').parent();
			self.$active = $('<span class="selected">'+self.selected.title+'</span>').appendTo(self.$container);
			self.$carat = $('<span class="carat"/>').appendTo(self.$container);
			self.$scrollWrapper = $('<div><ul/></div>').appendTo(self.$container);
			self.$dropDown = self.$scrollWrapper.find('ul');
			$.each(self.options, function(){
				var option = this,
					active = option.selected ? ' class="active"':'';
				self.$dropDown.append('<li'+active+'>'+option.title+'</li>');
			});
			self.$items = self.$dropDown.find('li');
			self.maxHeight = 0;
			if(self.cutOff)self.$container.addClass('scrollable');
			for(i = 0; i < self.$items.length; i++){
				var $item = self.$items.eq(i);
				self.maxHeight += $item.outerHeight();
				if(self.cutOff == i+1){
					break;
				};
			};

			if(!self.isTouch){
				self.bindHandlers();
			} else {
				self.bindTouchHandlers();
			}
		},
		
		bindTouchHandlers: function(){
			var self = this;
			self.$container.on('click',function(){
				self.$select.focus();
			});
			self.$select.on({
				change: function(){
					var title = $(this).find('option:selected').text();
					self.$active.text(title);
				},
				focus: function(){
					self.$container.addClass('focus');
				},
				blur: function(){
					self.$container.removeClass('focus');
				}
			})
		},
	
		bindHandlers: function(){
			var self = this;
			
			self.query = '';

			self.$container.on('click',function(){
				if(!self.down){
					self.open();
				} else {
					self.close();
				};
			});
			
			$('body').on('click',function(e){
				var $target = $(e.target);
				if(!$target.closest('.'+self.wrapperClass).length && self.down){
					self.close();
				};
			})

			self.$items.on({
				click: function(){
					var index = $(this).index();
					self.select(index);
				},
				mouseover: function(){
					var $t = $(this);
					$t.addClass('focus').siblings().removeClass('focus');
					self.focusIndex = $t.index();
				},
				mouseout: function(){
					$(this).removeClass('focus');
				}
			});

			self.$select.on({
				focus: function(){
					self.$container.addClass('focus');
					self.inFocus = true;
				},
				blur: function(){
					self.$container.removeClass('focus');
					self.inFocus = false;
				}
			});
			
			$(window).on('keydown', function(e){
				if(self.inFocus){
					var key = e.keyCode;
					if(key == 38 || key == 40 || key == 32){
						e.preventDefault();
						if(key == 38){
							self.focusIndex--
							self.focusIndex = self.focusIndex < 0 ? self.$items.length - 1 : self.focusIndex;
						} else if(key == 40){
							self.focusIndex++
							self.focusIndex = self.focusIndex > self.$items.length - 1 ? 0 : self.focusIndex;
						};
						if(!self.down){
							self.open();
						};
						self.$items.removeClass('focus').eq(self.focusIndex).addClass('focus');
						if(self.cutOff){
							var $focusItem = self.$items.eq(self.focusIndex),
								scroll = ($focusItem.outerHeight() * (self.focusIndex + 1)) - self.maxHeight;
							self.$dropDown.scrollTop(scroll);
						};
						self.query = '';
					};
					if(self.down){
						if(key == 9 || key == 27){
							self.close();
						} else if(key == 13){
							self.select(self.focusIndex);
							self.close();
						} else if(key == 8){
							e.preventDefault();
							self.query = self.query.slice(0,-1)
							self.search();
						} else if(key != 38 && key != 40){
							var letter = String.fromCharCode(key);
							self.query += letter;
							self.search();
						};
					};
				};
			});
		},
		
		open: function(){
			var self = this,
				x = window.scrollX, 
				y = window.scrollY;
			self.closeAll();
			self.$select.focus();
			window.scrollTo(x, y);
			self.$container.addClass('open');
			self.$scrollWrapper.css('height',self.maxHeight+'px');
			self.down = true;
		},
		
		close: function(){
			var self = this;
			self.$select.blur();
			self.$container.removeClass('open');
			self.$scrollWrapper.css('height','0px');
			self.focusIndex = self.selected.index;
			self.query = '';
			self.down = false;
		},
		
		closeAll: function(){
			var self = this,
				instances = Object.getPrototypeOf(self).instances;
			for(i = 0; i < instances.length; i++){
				instances[i].close();
			};
		},
	
		select: function(index){
			var self = this,
				option = self.options[index],
				selectIndex = self.hasLabel ? index + 1 : index;
			self.$items.removeClass('active').eq(index).addClass('active');
			self.$active.text(option.title);
			self.$select.find('option').prop('selected',false).eq(selectIndex).prop('selected','selected');
			self.selected = {
				index: index,
				title: option.title
			};
			self.focusIndex = i;
			if(typeof self.onSelect == 'function'){
				self.onSelect.call(self,{
					title: option.title, 
					value: option.value
				});
			};
		},
		
		search: function(){
			var self = this;
			for(i = 0; i < self.options.length; i++){
				var title = self.options[i].title.toUpperCase();
				if(title.indexOf(self.query) != -1){
					self.focusIndex = i;
					self.$items.removeClass('focus').eq(self.focusIndex).addClass('focus');
					break;
				};
			};
		}
	};
	
	function instantiate(domNode, settings){
		var instance = new EasyDropDown();
		instance.init(domNode, settings);
		instance.instances.push(instance);
	};
	
	$.fn.easyDropDown = function(settings){
		return this.each(function(){
			instantiate(this, settings);
		});
	};
	
	$(function(){
		$('.dropdown').each(function(){
			var json = $(this).attr('data-settings');
				settings = json ? $.parseJSON(json) : {}; 
			instantiate(this, settings);
		});
	})
})(jQuery);