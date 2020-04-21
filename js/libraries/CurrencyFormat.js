// Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor 
  this.CurrencyFormat = function(localUi,className,negativeAllow) {
    // Create global element references
	this.autoNumericFormat = null;
	this.className =className;
	this.localUI = localUi;
	this.defaults = getCulture(this.localUI);
	this.arguments=negativeAllow==true?{}:{minimumValue:"0"};
	// Create options by extending defaults with the passed in arugments
	this.options = extendOptions(this.arguments, this.defaults);
	
  }

  // Public Methods

	CurrencyFormat.prototype.init = function() {
		init.call(this);
		//placeholder.call(this);
	}
	
	CurrencyFormat.prototype.destroy = function() {
		if(this.autoNumericFormat) {
			this.autoNumericFormat.forEach(function(key, value){
				key.global.remove();
			});
		}
	}
	
	CurrencyFormat.prototype.update = function(locale) {
		if(this.autoNumericFormat) {
			var options = extendOptions(this.arguments, getCulture(locale));
			this.autoNumericFormat.forEach(function(key){
				key.global.update(options);
			});
		}
	}
	
	CurrencyFormat.prototype.getInstance = function(id) {
		if(this.autoNumericFormat) {
			for(var key in this.autoNumericFormat) {
				if(this.autoNumericFormat.hasOwnProperty(key)) {
					var getID = this.autoNumericFormat[key].domElement.getAttribute('id');
					if(getID == id) return this.autoNumericFormat[key];
				}
			}
		}
	}
	
	CurrencyFormat.prototype.unformat = function(id) {
		if(this.autoNumericFormat) {
			for(var key in this.autoNumericFormat) {
				if(this.autoNumericFormat.hasOwnProperty(key)) {
					this.autoNumericFormat[key].global.unformat();
				}
			}
		}
	}
	
	CurrencyFormat.prototype.reformat = function(id) {
		if(this.autoNumericFormat) {
			for(var key in this.autoNumericFormat) {
				if(this.autoNumericFormat.hasOwnProperty(key)) {
					this.autoNumericFormat[key].global.reformat();
				}
			}
		}
	}
	
	CurrencyFormat.prototype.global = function(id) {
		if(this.autoNumericFormat) {
			for(var key in this.autoNumericFormat) {
				if(this.autoNumericFormat.hasOwnProperty(key)) {
					var getID = this.autoNumericFormat[key].domElement.getAttribute('id');
					if(getID == id) return this.autoNumericFormat[key].global;
				}
			}
		}
	}
	
	CurrencyFormat.prototype.isPristine = function(id) {
		if(this.autoNumericFormat) {
			for(var key in this.autoNumericFormat) {
				if(this.autoNumericFormat.hasOwnProperty(key)) {
					var getID = this.autoNumericFormat[key].domElement.getAttribute('id');
					if(getID == id) return this.autoNumericFormat[key].global.isPristine();
				}
			}
		}		
	}
	
	
  // Private Methods

	function init() {
		this.autoNumericFormat = AutoNumeric.multiple(this.className, this.options);
		return this.autoNumericFormat;
	};
	
	function getCulture(locale) {
		var getLocale = locale || this.localUI;
		var culture = Globalize.culture(getLocale);
		var groupSizes = culture.numberFormat.currency.groupSizes || [];
		var customGroupSize = { "hi" : "2" };
		// Define option defaults 
		var options = {
			//currencySymbol: " "+culture.numberFormat.currency.symbol,
			decimalCharacter: culture.numberFormat.currency['.'],
			decimalCharacterAlternative: '.',
			digitalGroupSpacing: (groupSizes.length == 1) ? groupSizes[0] : customGroupSize[getLocale],
			digitGroupSeparator: culture.numberFormat.currency[','],
			decimalPlaces: culture.numberFormat.currency.decimals,
			caretPositionOnFocus: "start",
			negativePositiveSignPlacement: 'p',
			currencySymbolPlacement: "s",
			unformatOnSubmit: false,
			emptyInputBehavior: "press",
			selectOnFocus: false,
			showWarnings: true,
			onInvalidPaste: 'error',
			formatOnPageLoad: true,
			modifyValueOnWheel: false
		}
		return options;
	};
	
	function extendOptions(args, options){
		var paramOptions = null;
		if (args && typeof args === "object") {
			paramOptions  = extendDefaults(options, args);
		}
		else {
			paramOptions = options;
		}
		return paramOptions;
	};
  
	function extendDefaults(source, properties) {
		if(properties) {
			var property;
			for (property in properties) {
				if (properties.hasOwnProperty(property)) {
					source[property] = properties[property];
				}
			}
		}
		return source;
	};
	
	function placeholder() {
		if(this.autoNumericFormat) {
			var placeholder = this.options.currencySymbol;
			var selectorAll = document.querySelectorAll(this.className);			
			for(var index in selectorAll) {
				if(selectorAll.hasOwnProperty(index)) {
					selectorAll[i].setAttribute('placeholder', placeholder);
				}
			}
		}
	}

}());