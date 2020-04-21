function ManageTextBoxWithCheckBoxList(elem, actionUrl) {
    name = $(elem).siblings('.nameOwner').text();
    filtre_option = $(elem).siblings('.filtre_option_scroll')

    values = $.map(filtre_option.find('input:checkbox:checked'), function (li) { return $(li).attr("value"); });

    if ($(elem).val() != "") {
        filtre_option.empty();
        filtre_option.append('<div class="loader-filtre"><img src="../../Content/img/spinner.gif"></div>')
        filtre_option.show();
        $.ajax(
            {
                url: actionUrl + "?value=" + encodeURIComponent($(elem).val()),
                type: 'GET',
            }).success(function (data) {
                var checkboxList = ""
                data.forEach(function (result) {
                    previousCheck = values.indexOf(result.Key.toString()) != -1 ? ' checked="true"' : ''

                    if (result.Key == undefined) {
                        key = result;
                        value = result;
                    }
                    else {
                        key = result.Key;
                        value = result.Value;
                    }
                    checkboxList += '<div class="filter_checkbox"><input type="checkbox" id="' + name + key + '" name="' + name + '" value="' + key + '" ' + previousCheck + ' class="checkbox-label"><label for="' + name + key + '" class="css-label">' + value + '</label></div>';
                })
                filtre_option.empty();
                filtre_option.append(checkboxList);
            })
    }
    else {
        filtre_option.hide();
    }
}