
// manage properly the subscrtion during a bulk insertion
ko.observableArray.fn.pushAll = function (valuesToPush) {
    var underlyingArray = this();
    this.valueWillMutate();
    ko.utils.arrayPushAll(underlyingArray, valuesToPush);
    this.valueHasMutated();
    return this;  //optional
};

// manage properly the subscrtion when emptying an array
ko.observableArray.fn.popAll = function () {
    var underlyingArray = this();
    this.valueWillMutate();
    while (underlyingArray.length > 0) underlyingArray.pop();
    this.valueHasMutated();
    return this;  //optional
};

// manage properly the subscrtion when replacing the content of an array
ko.observableArray.fn.replace = function (valuesToPushInsteadOf) {
    var underlyingArray = this();
    this.valueWillMutate();
    while (underlyingArray.length > 0) underlyingArray.pop();
    ko.utils.arrayPushAll(underlyingArray, valuesToPushInsteadOf);
    this.valueHasMutated();
    return this;  //optional
};

ko.extenders.async = function (computedDeferred, initialValue) {

    var plainObservable = ko.observable(initialValue), currentDeferred;
    plainObservable.inProgress = ko.observable(false);

    ko.computed(function () {
        if (currentDeferred) {
            currentDeferred.reject();
            currentDeferred = null;
        }

        var newDeferred = computedDeferred();
        if (newDeferred &&
            (typeof newDeferred.done == "function")) {

            // It's a deferred
            plainObservable.inProgress(true);

            // Create our own wrapper so we can reject
            currentDeferred = $.Deferred().done(function (data) {
                plainObservable.inProgress(false);
                plainObservable(data);
            });
            newDeferred.done(currentDeferred.resolve);
        } else {
            // A real value, so just publish it immediately
            plainObservable(newDeferred);
        }
    });

    return plainObservable;
};

/*// manage properly the subscrtion when removing an item from an array
ko.observableArray.fn.remove = function (item) {
    var underlyingArray = this();
    this.valueWillMutate();
    ko.utils.arrayRemoveItem(underlyingArray, item);
    this.valueHasMutated();
    return this;  //optional
};*/
