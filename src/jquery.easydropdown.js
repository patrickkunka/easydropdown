/*
* EASYDROPDOWN - A Dropdown Builder For Styled Inputs and Menus
* Version: 1.0
* License: Creative Commons Attribution 3.0 Unported - CC BY 3.0
* http://creativecommons.org/licenses/by/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2013 Patrick Kunka, All Rights Reserved
*/


(function($){
	
	function EasyDropDown(){
		this.options = [];
		this.isField = true;
		this.down = false;
		this.maxHeight = 0;
		this.cutOff = false;
		this.wrapperClass = 'easydropdown'
	};
	
	EasyDropDown.prototype = {
		constructor: EasyDropDown,
		init: function(domNode, settings){
			var self = this;
			
			$.extend(self, settings);
			
			self.$select = $(domNode);
			
			self.$select.find('option').each(function(i){
				var $option = $(this);
				if($option.is(':selected')){
					self.selected = {
						index: i,
						title: $option.text()
					}
				};
				self.options.push({
					domNode: $option[0],
					title: $option.text(),
					value: $option.val(),
					selected: $option.is(':selected')
				});
			});
			self.render();
		},
	
		render: function(){
			var self = this;
			self.$container = self.$select.wrap('<div class="'+self.wrapperClass+'"/>').parent();
			self.$active = $('<span class="selected">'+self.selected.title+'</span>').appendTo(self.$container);
			self.$scrollWrapper = $('<div class="scroll-wrapper"><ul></ul></div>').appendTo(self.$container);
			self.$dropDown = self.$scrollWrapper.find('ul');
			$.each(self.options, function(){
				var option = this,
					active = option.selected ? ' class="active"':'';
				self.$dropDown.append('<li'+active+'>'+option.title+'</li>');
			});
			self.$items = self.$dropDown.find('li');
			console.info(self)
			for(i = 0; i < self.$items.length; i++){
				var $item = self.$items.eq(i);
				self.maxHeight += $item.outerHeight();
				if(self.cutOff == i+1){
					break;
				};
			};

			self.bindHandlers();
		},
	
		bindHandlers: function(){
			var self = this;

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

			self.$items.on('click', function(){
				var index = $(this).index();
				self.select(index);
			});

			if(self.isField){
				self.$select.on({
					focus: function(){
						self.$container.addClass('focus')
					},
					blur: function(){
						self.$container.removeClass('focus')
					}
				});
			};
		},
		
		open: function(){
			var self = this,
				x = window.scrollX, 
				y = window.scrollY;
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
			self.down = false;
		},
	
		select: function(index){
			var self = this;
			self.$items.removeClass('active').eq(index).addClass('active');
			self.$active.text(self.options[index].title);
			self.$select.find('option').prop('selected',false).eq(index).prop('selected','selected');
		}
	};
	
	$.fn.easyDropDown = function(settings){
		return this.each(function(){
			var instance = new EasyDropDown();
			instance.init(this, settings);
		});
	};
})(jQuery);