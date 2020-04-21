
function truncate(number) {
    return number > 0
         ? Math.floor(number)
         : Math.ceil(number);
}

ko.bindingHandlers.customSlider = {
    init: function (elem) {

        var min = truncate(parseFloat($(elem).attr('data-min')));
        var max = truncate(parseFloat($(elem).attr('data-max')));
        var step = $(elem).attr('data-step');
        if(isNaN(min)){
			min = 0;
		}
		if(isNaN(max)){
			max = 1;
		}
		intializeSlider(elem, min, max, step);
        ChangeKOSliderValues(elem, min, max)
        $(elem).siblings('.minValue, .maxValue').change(function (event, data) {
        	
            var currentSliderValues = $(elem).slider('values');
            var hiddenValues = [parseFloat($(elem).siblings('.minValue').val()), parseFloat($(elem).siblings('.maxValue').val())]
            if( isNaN(hiddenValues[0]) && isNaN(hiddenValues[1])){
            	intializeSlider(elem, min, max, step);
				$(elem).siblings('.minValue').val("");
        		$(elem).siblings('.maxValue').val("");
            }
            else if (currentSliderValues[0] != hiddenValues[0] || currentSliderValues[1] != hiddenValues[1]) {
                $(elem).slider('values', [$(elem).siblings('.minValue').val(), $(elem).siblings('.maxValue').val()])
            }
            
            if(data){
            	min = data.min;
            	max = data.max;
            	intializeSlider(elem, data.min, data.max, data.step);
        		$(elem).siblings('.minValue').val("");
        		$(elem).siblings('.maxValue').val("");
        	}
        });
        
        
    },
    update: function () {
        
    }
};

function intializeSlider(elem, min, max, step){
	$(elem).slider({
        range: true,
        min: min,
        max: max,
        step: !!step ? parseFloat(step) : 1,
        values: [min, max],
        change: function (event, ui) {
            ChangeKOSliderValues(elem, ui.values[0], ui.values[1])
        },
        slide: function (event, ui) {
            $(elem).siblings('.sliderMinDisplay').text(ui.values[0])
            $(elem).siblings('.sliderMaxDisplay').text(ui.values[1])
        }
    });
}

function ChangeKOSliderValues(elem, min, max) {
	$(elem).siblings('.sliderMinDisplay').text(min)
	$(elem).siblings('.sliderMaxDisplay').text(max)

	var defmin = truncate(parseFloat($(elem).attr('data-min')));
	var defMax = truncate(parseFloat($(elem).attr('data-max')));
	
	if(isNaN(defmin) || isNaN(defMax)){
		return;
	}
	if(min == defmin){
		$(elem).siblings('.minValue').val("");
	} else{
		$(elem).siblings('.minValue').val(min);
	}

	if(max == defMax){
		$(elem).siblings('.maxValue').val("");
	} else{
		$(elem).siblings('.maxValue').val(max);
	}

	var tmpMax = $(elem).siblings('.maxValue').val();
	var tmpMin = $(elem).siblings('.minValue').val();
	if(tmpMin == "" && tmpMax != "" && tmpMax != defMax){
		$(elem).siblings('.minValue').val(defmin);
	} 

	if(tmpMax == "" && tmpMin != "" && tmpMin != defmin){	
		$(elem).siblings('.maxValue').val(defMax);
	}
}