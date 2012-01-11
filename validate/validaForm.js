
/**
 * Copyright (C) 2012 Alexsandro Pereira and Alex Agena
 * All rights reserved.
 * 
 * jquery.listSplit
 * A jQuery plugin to split a list, passing the number of slices as argument
 * Good for lists that need to fit horizontal spaces
 * Works on <ol>, <ul> or <dl>
 * Restore all element attributes in the container <div>
 * Returns new jQuery container to chain
 * Got some side effects on nested lists
 * 
 * Author: Alexsandro Pereira(apssouza22.com.br / @apssouza22) and Alex Agena
 * Created: 2012-01-10
 * Release: ?
 * License: http://www.opensource.org/licenses/mit-license.php
 * You can do anything with this code, but do not sue me.
 */
$.fn.configForm = function (options)
{
	var self = $(this),
		fields = self.find("input, textarea,select"),
		args = arguments,

		defaults = {
			addFieldError: function (field) {
				field.addClass("error");
			},
			removeFieldError: function (field) {
				field.removeClass("error");
			},
			onFocus: true
		}

	$.extend(defaults, options);

	/**
	 *Validações aqui, adicione a sua
	 **/
	var listMethods = {
			'required' : function(value,field)
			{
				if(field.attr('type') == 'checkbox'){
					return field.is(':checked');
				}
				return value != "";
			},

			'email' : function(value)
			{
				return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
			},

			'cpf' : function (value)
			{
				value = value.replace('.', '');
				value = value.replace('.', '');
				cpf = value.replace('-', '');
				while(cpf.length < 11)
					cpf = "0" + cpf;
				var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/,
					a = [],
					b = new Number,
					c = 11;
					

				for( i = 0; i < 11; i++) {
					a[i] = cpf.charAt(i);
					if(i < 9)
						b += (a[i] * --c);
				}
				if(( x = b % 11) < 2) {
					a[9] = 0
				} else {
					a[9] = 11 - x
				}
				b = 0;
				c = 11;
				for( y = 0; y < 10; y++)
				b += (a[y] * c--);
				if(( x = b % 11) < 2) {
					a[10] = 0;
				} else {
					a[10] = 11 - x;
				}
				if((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg))
					return false;
				return true;
			},

			'date' : function(value)
			{
				return !/Invalid|NaN/.test(new Date(value));
			}
		};

	/*
	 * Validate Field
	 *
	 */
	function validateField (field)
	{
		var result;
		var value	= field.val();
		var classes	=  field.attr('class');

		if(!classes) return true;

		classes		=  classes.split(' ');

		var fieldValue	= field.val();
		var boolResult	= true;

		if (field.attr("min"))
			return checkMin(field);

		$.each(classes,function(i, value){
			if (listMethods.hasOwnProperty(value)) {
				boolResult = listMethods[value](fieldValue,field);
				return  boolResult;
			}
		})

        return boolResult;
	}

	function checkMin(field)
	{
		return field.val().length >= parseInt(field.attr("min"));
	}

	//EVENTOS QUE DISPARA A VALIDA��O

	//EVENTO SUBMIT
	self.submit(function ()
	{
		var currentField;
		var resultField;
		var finalResult = true;

		// check each field
		fields.each(function ()
		{
			currentField = $(this);
			resultField = validateField(currentField);
			if(!resultField) {
				finalResult = false;
				defaults.addFieldError(currentField);
			} else {
				defaults.removeFieldError(currentField);
			}
		});

		// if success
		if (finalResult) {
			//IF EXISTE CALLBECK
			if(typeof(args[args.length -1]) == 'function'){
				args[args.length -1]();
				return false;
			}
		}
		return finalResult;
	});

	if(defaults.onFocus) {
		fields.focusout(function ()
		{
			if(validateField($(this))) {
				defaults.removeFieldError($(this));
			} else {
				defaults.addFieldError($(this));
			}
		});
	}

}