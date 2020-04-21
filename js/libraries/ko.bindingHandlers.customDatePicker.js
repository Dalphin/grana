ko.bindingHandlers.customDatePicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = {
            dateFormat: "dd/mm/yy",
            beforeShow: function (input) {
                $(input).css({
                    "position": "relative",
                    "z-index": 860,
                    "text-align": "left"
                });
            },
            showOn: 'button',
            buttonText: 'Show Date',
            buttonImageOnly: true,
            buttonImage: '/Content/img/commun/picto-calendar.svg'
        };

        $(element).datepicker(options);

        //handle the field changing by registering datepicker's changeDate event
        ko.utils.registerEventHandler(element, "changeDate", function () {
            var observable = valueAccessor();
            observable($(element).datepicker("getDate"));
        });

        //handle disposal (if KO removes by the template binding)
        //ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        //    $el.datepicker("destroy");
        //});

    },
    update: function (element, valueAccessor) {
        //var value = ko.utils.unwrapObservable(valueAccessor()),
        //    $el = $(element);

        ////handle date data coming via json from Microsoft
        //if (String(value).indexOf('/Date(') == 0) {
        //    value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
        //}

        //var current = $el.datepicker("getDate");

        //if (value - current !== 0) {
        //    $el.datepicker("setDate", value);
        //}
    }
};