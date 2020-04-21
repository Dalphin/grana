/**
 * 
 */

function CheckBoxItem(id, text, checked,maskLabel) {
	this.id = ko.observable(text+id);
	this.value = ko.observable(id);
	this.text = ko.observable(text);
	this.isChecked = ko.observable(checked);
	this.maskLabel = ko.observable(maskLabel);
}

var ViewModel = function(data, params) {
	var self = this;
	var _params = ko.utils.parseJson(params);
	self.data = data;
	self.name = ko.observable(_params.name);
	self.items = ko.observableArray();
	self.id = _params.id;
	self.filter = ko.observable("");
	self.filteredItems = ko
	.dependentObservable(function() {
		if (!self.filter()) {
			return self.items();
		} else {
			return ko.utils.arrayFilter(self.items(),
					function(item) {
				return item.text().toLowerCase().indexOf(
						self.filter().toLowerCase()) !== -1;
			});
		}
	});

	self.show = function(){
		if(self.items().length == 0 ){
			prepareData(self.items, self.data);
		}
	};
	if(self.items().length == 0 ){
		prepareData(self.items, self.data);
	}

};


var AutoCompleteViewModel = function(data, params) {
	var self = this;
	var _params = ko.utils.parseJson(params);
	var mask = _params.maskLabel || false;
	self.data = data;
	self.name = ko.observable(_params.name);
	self.type = _params.type;
	self.id = _params.id;
	self.filterId = _params.filterId;
	self.formId = _params.filterId + '-filterForm';
	self.noSelection = ko.observable(false);
	self.enableFilter = ko.observable(true);
	self.maskLabel = mask.toString();
	self.noSelLabel = _params.noSelLabel;
	self.filter = ko.observable("");
	self.url = _params.dataURL;
	self.preserveSelected = _params.preserveSelected;
	self.filteredItems = ko.observableArray([]);
	var currentRequest = null;
	
	if(self.data && self.filteredItems().length == 0 ){
		prepareData(self.filteredItems, self.data);
		self.data = "";
	}
		
	self.filter.subscribe(function(){
		if(self.filter().length >= 2){
			self.getData();
		}
		if(self.filter().length == 0){
			if(currentRequest != null) {
				currentRequest.abort();
				$('#'+self.id+'spin').hide();
			}
			var selectedItems = getSelectedItems(self.filteredItems());
			self.filteredItems([]);
			if(self.preserveSelected){
				selectedItems.forEach(function(item){
					self.filteredItems.push(item);
				});
			}
		}
	});

	self.getData = function(){
		var selectedItems = getSelectedItems(self.filteredItems());
		var formData = getFilterFormData(self.formId);
		formData['term'] = self.filter();
		formData['type'] = self.type;
		var spinElem = $('#'+self.id+'spin');
		var selectedItemList = [];
		spinElem.show();
		currentRequest = jQuery.ajax({
			type: 'POST',
			data: formData,
			url: self.url,
			dataType: 'JSON',
			beforeSend : function()    {           
				if(currentRequest != null) {
					currentRequest.abort();
				}
			},
			success: function(data) {
				self.filteredItems([]);
				if(self.preserveSelected){
					selectedItems.forEach(function(item){
						selectedItemList.push(item.value())
						self.filteredItems.push(item);
					});
				}
				$.each(data, function (k,v){
					var itemExist = false;
					if(self.preserveSelected && selectedItemList.length > 0 ){
						itemExist = selectedItemList.indexOf(v['id']) > -1;
					}
					if(!itemExist){
						self.filteredItems.push(new CheckBoxItem(v['id'], v['text'], v['selected'],v['maskLabel']));	
					}
				});
				spinElem.hide();
			}
		});
	}

	self.clearSelection = function(){
		if(self.noSelection()){
			self.enableFilter(false);
			self.filteredItems([]);
			self.filter("");
		} else{
			self.enableFilter(true);
		}
	}
};

var FetchViewModel = function(params) {
	var self = this;
	var _params = ko.utils.parseJson(params);
	var mask = _params.maskLabel || false;
	self.name = ko.observable(_params.name);
	self.type = ko.observable(_params.type);
	self.fetchAlways = _params.fetchAlways;
	self.id = _params.id;
	self.filterId = _params.filterId;
	self.formId = _params.filterId + '-filterForm';
	self.preserveSelected = _params.preserveSelected;
	self.maskLabel = mask.toString();  
	self.filter = ko.observable("");
	self.items = ko.observableArray();
	self.url = _params.dataURL;
	self.filteredItems = ko
	.dependentObservable(function() {
		if (!self.filter()) {
			return self.items();
		} else {
			return ko.utils.arrayFilter(self.items(),
					function(item) {
				return item.text().toLowerCase().indexOf(
						self.filter().toLowerCase()) !== -1;
			});
		}
	});

	self.show = function(){
		var opened = $('#'+self.id).find('.titre').hasClass('up');
		if(!opened && self.fetchAlways === 'true' || self.items().length == 0 ){
			self.getData();
		}
	};
	self.getData = function(){
		var spinElem = $('#'+self.id+'spin');
		var selectedItemList = [];
		var selectedItems = getSelectedItems(self.items());
		var tmpFilterText = self.filter();
		self.items([]);
		self.filter("");
		var formData = getFilterFormData(self.formId);
		formData['term'] = self.filter();
		formData['type'] = self.type;
		spinElem.show();
		$.post(self.url, formData,null,"JSON").done(function(data){
			if(self.preserveSelected){
				selectedItems.forEach(function(item){
					selectedItemList.push(item.value())
				});
			}
			$.each(data, function (k,v){
				var itemExist = false;
				if(self.preserveSelected && selectedItemList.length > 0 ){
					itemExist = selectedItemList.indexOf(v['id']) > -1;
				}
				self.items.push(new CheckBoxItem(v['id'], v['text'], itemExist,v['maskLabel']));
			});
			self.filter(tmpFilterText);
			spinElem.hide();
		});
	}
};

var DateRangeViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	var mask = _params.maskLabel || false;
	self.compName = _params.name;
	self.id = _params.id;
	self.fromName = _params.fromName;
	self.toName = _params.toName;
	self.fromId = _params.fromName+_params.id;
	self.toId = _params.toName+_params.id;
	self.fromLabel = _params.fromLabel;
	self.toLabel = _params.toLabel;
	self.fromValue = _params.fromValue;
	self.toValue =_params.toValue;
	self.maskLabel = mask.toString();  
	self.show = function(){
	}
};

var ActiveFilterModel = function(formId, reloadBtnId){
	var self = this;
	self.formId = formId;
	self.reloadBtnId = reloadBtnId;
	self.appliedFilters = ko.observableArray([]);
	self.addFilter = function(inputDataModel){
		var item = ko.utils.arrayFirst(self.appliedFilters(), function (item) {
            return item.name() === inputDataModel.name;
        });
		if(item != null){
			var newTitleValue = item.title() +', '+ inputDataModel.valueText;
			if(item.type() === 'range'){
				var preTitle = item.title();
				var preVal = preTitle.substr(preTitle.lastIndexOf(" ") + 1 );
				var curVal = inputDataModel.valueText.substr(inputDataModel.valueText.lastIndexOf(" ") + 1);
				if(curVal === preVal){
					newTitleValue = inputDataModel.label + " : " + curVal;
				}
			}
			item.title(newTitleValue);
		} else{
			var appliedFilter ={
					"name" : ko.observable(inputDataModel.name),
					"type" : ko.observable(inputDataModel.type),
					"title" :ko.observable(inputDataModel.label+ " : " +inputDataModel.valueText) 
			}
			self.appliedFilters.push(appliedFilter);
		}
	}
	
	self.resetFilter = function(){
		self.appliedFilters([]);
	}
	
	self.removeFilter = function(item){
		var name = item.name();
		self.removeFilterItem(name);
		if(name === 'accountId'){
			self.removeFilterItem('divisionId');
		} else if(name === 'customerId'){
			self.removeFilterItem('accountId');
			self.removeFilterItem('divisionId');
		}
		
		$('#'+reloadBtnId).click();
	}
	
	self.removeFilterItem = function(name){
		var item = ko.utils.arrayFirst(self.appliedFilters(), function (item) {
            return item.name() === name;
        });
		if(item != null ){
			var formId = '#' + self.formId;
			if(item.type() === 'checkbox'){
				var elem = $(formId + ' input[type="checkbox"][name="'+name+'"]');
				if(elem.hasClass("chkNoSelLbl")){
					$(elem).trigger("click");
				} else{
					var filterTextElem = elem.parent().parent().parent().find('.filterTextClass');
					if(filterTextElem.length > 0){
						filterTextElem.val("");
						filterTextElem.trigger('propertychange');
					}
					$(formId + ' input[type="checkbox"][name="'+name+'"]').attr('checked',false);	
				}
			} else if(item.type() === 'range'){
				var elem = $(formId + " input[compname='"+name+"']"); 
				elem.val('');
				if(elem.hasClass('numSlider')){
					$('.minValue').trigger('change');
				}
			}
			else{
				var elem = $(formId + ' [name="'+name+'"]');
				if(elem.hasClass('select2')){
					elem.val(null).trigger('change');
				} else{
					elem.val('');	
				}
			}
			self.appliedFilters.remove(function (filterToRemove) {
	            return filterToRemove.name() == name;
	        });
		}
	}
	
	self.removeAllFilters = function(){
	}
};


var SliderViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	self.compName = _params.name;
	self.id = _params.id;
	self.minValue = _params.minValue;
	self.maxValue = _params.maxValue;
	self.step = _params.step;
	self.minName = _params.fromName;
	self.maxName = _params.toName;
	self.minId = _params.fromName + _params.id;
	self.maxId = _params.toName + _params.id;
	self.inpMinValue = ko.observable();
	self.inpMaxValue = ko.observable();
	
	self.show = function(){
	}
};

var SliderUnitViewModel = function(data, params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	self.compName = _params.name;
	self.id = _params.id;
	self.minValue = ko.observable();
	self.maxValue = ko.observable();
	self.data = ko.utils.parseJson(data);
	self.step = _params.step;
	self.type = _params.type;
	self.minName = _params.fromName;
	self.maxName = _params.toName;
	self.minId = _params.fromName + _params.id;
	self.maxId = _params.toName + _params.id;
	self.inpMinValue = ko.observable("");
	self.inpMaxValue = ko.observable("");
	self.Unit = ko.observableArray();
	self.Options = ko.observableArray($(self.data).map(function (index, elem) { return elem.name }).toArray());
	
	self.show = function(){
	}
	
	self.Unit.subscribe(function () {
        if (self.Unit() != null && self.Unit().length != 0) {
            var choice = $.grep(self.data, function (n) { return n.name.id == self.Unit() })[0];
            self.minValue(choice.min);
            self.maxValue(choice.max);
            $('#'+self.id).find('.minValue').trigger('change', [{min:choice.min, max:choice.max, step: self.step}]);
        }
    });
	
};

var TextViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	var mask = _params.maskLabel || false;
	self.name = _params.name;
	self.id = _params.name+_params.id;
	self.tooltip = ko.observable(_params.tooltip);
	self.url = _params.dataURL;
	self.type = _params.type;
	self.autoComplete = _params.autoComplete;
	self.maskLabel = mask.toString(); 
	self.FilterTextbox = ko.observable(_params.fromValue);
	self.show = function(){
	}
	
	self.launchAutocomplete = function () {
        if (self.autoComplete === 'true') {
            $('#' + self.id).autocomplete({
                source: function (request, response) {
                    $.get(self.url, {
                    	type: self.type,
                        term: request.term
                    }, function (data) {
                        var nbElement = data.length;
                        if (nbElement == 0) {
                            return false;
                        }
                        response($.map(data, function (autocompleteResult) {
                            return {
                                label: autocompleteResult.text,
                                desc: autocompleteResult.Description != undefined ? autocompleteResult.Description : ''
                            }
                        }))
                    },"JSON");
                },
                open: function () {
                    var zind = 1000;
                    $('ul.ui-autocomplete').css("z-index", zind);
                    $('.cost_autocomplete').css("z-index", zind + 1);
                },
                change: function (event, ui) {
                    if (ui.item) {                    
                        self.FilterTextbox(ui.item.label);
                    }
                },
                appendTo: $('#' + self.id).next(),
                minLength: 3
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                  .data("ui-autocomplete-item", item)
                  .append("<span class='center-puce'>" + item.label + "<br>" + "<span class='more_data'>" + item.desc + "</span></span>")
                  .appendTo(ul);
            };
        }
    }
};

var SelectViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	var mask = _params.maskLabel || false;
	self.name = _params.name;
	self.remote = _params.fetchRemote;
	self.url = _params.dataURL;
	self.type = _params.type;
	self.filterId = _params.id;
	self.id = _params.name + _params.id;
	self.maskLabel = mask.toString();
	self.options = ko.observableArray();
	self.Value = ko.observableArray();
	self.minimumResultsForSearch = 0;
	
	self.show = function(){
		if(self.options().length == 0 ){
			if(self.remote === 'true'){
				self.getData();	
			} 
		}
	}
	
	self.getData = function(){
		var spinElem = $('#'+self.id+'spin');
		spinElem.show();
		$.post(self.url, {type: self.type},null,"JSON").done(function(data){
			ko.utils.arrayMap(data, function(item) {
			self.options.push(item);	
		});
			spinElem.hide();
		});
	}
	
	self.Value.subscribe(function () {
	});
};

var MonthRangeViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	self.id = _params.id;
	self.compName = _params.name;
	self.fromName = _params.fromName;
	self.toName = _params.toName;
	self.fromId = _params.fromName+_params.id;
	self.toId = _params.toName+_params.id;
	self.fromLabel = _params.fromLabel;
	self.toLabel = _params.toLabel;
	self.StartDate = ko.observable(_params.fromValue);
    self.EndDate = ko.observable(_params.toValue);
};

var YearRangeViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	self.id = _params.id;
	self.compName = _params.name;
	self.fromName = _params.fromName;
	self.toName = _params.toName;
	self.fromId = _params.fromName+_params.id;
	self.toId = _params.toName+_params.id;
	self.fromLabel = _params.fromLabel;
	self.toLabel = _params.toLabel;
	self.StartDate = ko.observable(_params.fromValue);
    self.EndDate = ko.observable(_params.toValue);
};

var TextRangeViewModel = function(params){
	var self = this;
	var _params = ko.utils.parseJson(params);
	self.compName = _params.name;
	self.id = _params.id;
	self.fromName = _params.fromName;
	self.toName = _params.toName;
	self.fromId = _params.fromName+_params.id;
	self.toId = _params.toName+_params.id;
	self.fromLabel = _params.fromLabel;
	self.toLabel = _params.toLabel;
	self.fromValue = _params.fromValue;
	self.toValue =_params.toValue; 
	self.show = function(){
	}
};


function prepareData(items, data){
	var dataList = ko.utils.parseJson(data);
	ko.utils.arrayMap(dataList, function(item) {
		items.push(new CheckBoxItem(item['id'], item['text'], item['selected'],item['maskLabel']));	
	});
}

var InputDataModel = function(name, type, label, values, valueText){
	self = this;
	self.name = name;
	self.type = type;
	self.label = label;
	self.valueText = valueText;
	self.values = values;
};

function getSelectedItems(filterItems){
	var selectedItems = ko.observableArray([]);
	filterItems.forEach(function(item){
		if(item.isChecked()){
			selectedItems.push(item);
		}
	});	
	return selectedItems();
}

function getFilterFormData(formId) {
	var frmId = "#" + formId;
	var filterTextVal = getUnFilteredData(frmId);
	
	var formArray = $(frmId).serializeArray();
	var fieldNameVal = {};
	var uniqueList = [];
	$.each(formArray, function(i, field) {
		if(uniqueList.indexOf(field.name) < 0){
			uniqueList.push(field.name);
			var inputDataModel = getInputValues(frmId, field.name);
			if (inputDataModel.values.length > 1) {
				$.each(inputDataModel.values, function(i, v) {
					fieldNameVal[field.name + '[' + i + ']'] = v;
				});
			} else {
				fieldNameVal[field.name] = field.value;
			}
		}
	});
	retainFilterData(filterTextVal, frmId);
	return fieldNameVal;
}

function getFormData(formId, activeFiltersVM) {
	var frmId = "#" + formId;
	
	var filterTextVal = getUnFilteredData(frmId);
	
	var formArray = $(frmId).serializeArray();
	var fieldNameVal = {};
	var uniqueList = [];
	var filterLabels = [];
	activeFiltersVM.resetFilter();
	$.each(formArray, function(i, field) {
		if(uniqueList.indexOf(field.name) < 0){
			uniqueList.push(field.name);
			var inputDataModel = getInputValues(frmId, field.name);
			if (inputDataModel.values.length > 1) {
				$.each(inputDataModel.values, function(i, v) {
					fieldNameVal[field.name + '[' + i + ']'] = v;
				});
			} else {
				fieldNameVal[field.name] = field.value;
			}
			if(inputDataModel.values.length > 0 && inputDataModel.values[0] != "" && inputDataModel.label){
				activeFiltersVM.addFilter(inputDataModel);	
			}
		}
	});
	
	if(activeFiltersVM.appliedFilters().length > 0){
		activeFiltersVM.appliedFilters().forEach(function(item){
			filterLabels.push(item.title());
		});
		fieldNameVal['appliedFilters'] = filterLabels.join(";");
	}
	retainFilterData(filterTextVal, frmId);
	
	return fieldNameVal;
}

function getUnFilteredData(frmId){
	var filterTextVal = {};
	$(frmId + ' .filterTextClass').each(function(){
		if($(this).val()){
			var id = $(this).attr("id");
			filterTextVal[id] = $(this).val();
			$(this).val("");
			$(this).trigger('propertychange');
		}
	});
	return filterTextVal;
}

function retainFilterData(filterTextVal, frmId){
	if(Object.keys(filterTextVal).length > 0){
		$.each(filterTextVal, function(key, value){
			var elem = $(frmId + ' #'+key);
			elem.val(value);
			elem.trigger('propertychange');
		});
	}
}

function getInputValues(frmId, name) {
	var elem = $(frmId + ' [name="' + name + '"]');
	var type;
	if(elem.is('select')){
		type = 'select';
	} else{
		type = elem.attr('type');
	}
	var valueText = "";
	var values;
	if(type === 'checkbox'){
		var chkElem = $(frmId + ' input[type="checkbox"][name="'+name+'"]:checked')
		values = chkElem.map(function() {
			return this.value;
		}).get();
		if(values.length == 1){
			valueText =  chkElem.attr('label');	
		}
	} else{
		values = elem.map(function() {
			return this.value;
		}).get();
		
	}
	if (values.length > 1) {
		valueText = values.length +' ' + filterValuesTitle;
	} 
	
	if( elem.hasClass('dateRange') || elem.hasClass('numSlider')){
		name = elem.attr('compName');
		valueText = elem.attr('label') + ' ' + values[0];
		type = 'range';
	} else if(type === 'text'){
		valueText = elem.val();
	} else if(type === 'select'){
		valueText = elem.find('option:selected').text();
	}
	
	var label = $('#' + name + '-labelId').attr('label');
	
	var inputValues = new InputDataModel(name, type, label, values, valueText);
	return inputValues;
}

function showFilterForm(elemId) {
	$("#"+elemId).dialog({
		draggable : !0,
		modal : !0,
		dialogClass:"ui-filterForm",
		width : 400,
		position : {
			my : "left",
			at : "left"
		},
		open : function() {
			$(".ui-filterForm .ui-dialog-title").remove(); 
			$('.ui-filterForm.ui-dialog').css('padding', '0');
			$("body").css({"overflow-y": "hidden"});
		},
		close: function(){
			$("body").css({"overflow-y": "scroll"});
		}
	});
}

function closeDialog(elem){
	if($(elem).hasClass('ui-dialog-content')){
		$(elem).dialog('close');	
	}
}

function reloadDataTable(filterId){
	dataTables[filterId].ajax.reload(function(){
		hideLoader();
		updateTableCount(filterId, dataTables[filterId].rows().count());
	});
}

function resetFormData(filterId){
	closeDialog('#'+filterId);
	$('#'+filterId+'-filterForm .filterTextClass').val("");
	$('#'+filterId+'-filterForm .filterTextClass').trigger('propertychange');
	$('#'+filterId+'-filterForm')[0].reset();
	$('#'+filterId+'-filterForm .select2').val("");
	$('#'+filterId+'-filterForm .select2').trigger('change');
	$('.minValue').trigger('change');
}

function getCheckedFiltersAsParams(formId, fieldName, paramName){
	var params = "";
	var chkdElems = $('#' + formId + ' input[type="checkbox"][name="'+fieldName+'"]:checked');
	chkdElems.each(function (){
		params += "&"+paramName+"=" + this.value;
	});
	return params;
}
