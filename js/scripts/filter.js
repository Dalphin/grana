$(document).ready(function () {
    $(document).on('click', '.btn-filtres', function (e) {
        e.preventDefault();
        $('.overlay_filtre').show();
        $('.block_filtres').animate({ 'left': '-220' }, "fast");
    });
});

function refresh_all_fields_filter() {
    $(".block_filtres .customSelect .first").click();
    $(".block_filtres input:text").val('');
    $(".block_filtres input:checkbox").prop('checked', false);
    $(".filtre_actif_bandeau").empty();
    $(".sliderMinValue").each(function () {
        slider = $(this).parent('.filtre_option').find(".ui-slider");
        min = slider.slider("option", "min");
        max = slider.slider("option", "max");

        slider.slider("values", [min, max]);
    });
}

function DeleteFilter(elem) {
    text = $(elem).text();
    parents = $("#filterForm span.titre:contains(" + text + ")").filter(function () {
        return text === $(this).text()
    }).parents('.filtre_statut');

    parents.find('.customSelect').find('.first').click();
    parents.find('input:text').val('');
    parents.find('input:checkbox').prop('checked', false);

    if ($(elem).parents('#filterForm').length != 0) {
    }
    else {
        $('#filterForm .filtres_actif a:contains("' + text + '")').filter(function () {
            return text === $(this).text();
        }).remove()
        LoadDataWithFilter();
    }
    $(elem).remove();
}

Array.prototype.getUnique = function () {
    var u = {}, a = [];
    for (var i = 0, l = this.length; i < l; ++i) {
        if (u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
    }
    return a;
}

function add_items_filters_header() {
    $(".filtre_actif_bandeau").empty();
    var filtersInputStr = '';
    var filtersInput = new Array();

    $("#filterForm input:text[name]").each(function () {
        if ($(this).val() != '') {
            filtersInput.push($(this).parents('.filtre_statut').find('.titre').text())
        }
    })

    $('#filterForm .block_input_select option[selected="selected"][value!=""]').each(function () {
        filtersInput.push($(this).parents('.filtre_statut').find('.titre').text())
    })

    $("#filterForm input:checkbox:checked").each(function () {
        filtersInput.push($(this).parents('.filtre_statut').find('.titre').text())
    })

    $("#filterForm .ui-slider").each(function () {
        var values = $(this).slider('values')
        var minValue = $(this).siblings('.sliderMinOriginal').attr('value')
        var maxValue = $(this).siblings('.sliderMaxOriginal').attr('value')

        if ( minValue != values[0] || maxValue != values[1])
        {
            filtersInput.push($(this).parents('.filtre_statut').find('.titre').text())
        }
    })

    filtersInput.getUnique().forEach(function (elem) {
        filtersInputStr += "<a href='#' onclick='DeleteFilter(this)'>" + elem + "<i class='icon supprimer'></i></a>";
    })

    if (filtersInputStr != '') {
        $(".filtre_actif_bandeau").append(filtersInputStr);
    }
}

function showHideFilterBlock(elem, forceHide) {
    visible = $(elem).next('.filtre_option').is(":visible")
    $(elem).parents('.block_filtres').find('.filtre_statut .filtre_option').slideUp();
    $(elem).parents('.block_filtres').find('.filtre_statut .titre').removeClass('up');
    if (forceHide == false) {
        if (visible == false) {
            $(elem).next('.filtre_option').slideToggle();
            $(elem).addClass('up');
        }
    }
    else if (forceHide == true) {
        $(elem).removeClass('up');
    }
}

function bindFilterCheckbox(){
	$(".resultat_search_compte .filterTextClass").off('keyup');
	$(".resultat_search_compte .filterTextClass").on('keyup',function(){
	 
	  var list=$(this).parent().next()
		setTimeout(function(){
			inputSortingChecked(list)
			
		},1000)
	});
	
}


function inputSortingChecked(list){
	origOrder = list.children();
   var i, checked = document.createDocumentFragment(),
        unchecked = document.createDocumentFragment();
		
		 for (i = 0; i < origOrder.length; i++) {
        if (origOrder[i].children[0].checked) {
            checked.appendChild(origOrder[i]);
        } else {
            unchecked.appendChild(origOrder[i]);
        }
    }
    list.append(checked).append(unchecked);
	
}

