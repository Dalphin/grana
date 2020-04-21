
// defines a KO view model select a restriction (customer/support/division)
var EditHierarchyVM = function (allSupportsLabel, allDivisionsLabel, allowSelectAll) {
    var self = this;
    self.restriction = ko.observable({
        ClientAccount: ko.observable(""),
        SupportAccount: ko.observable(""),
        Division: ko.observable("")
    });

    self.clientAccounts = ko.observableArray([]);
    self.allSupportAccounts = [];
    self.supportAccounts = ko.observableArray([]);
    self.allDivisions = [];
    self.divisions = ko.observableArray([]);

    self.setSupportAccounts = function () {
        var koAccount = self.restriction().ClientAccount;
        if (_.isNull(self.clientAccounts) || self.clientAccounts().length == 0 || _.isVoid(koAccount())) return;

        // fetch the support accounts filtered by customer account
        self.supportAccounts.popAll();
        if (allowSelectAll) self.supportAccounts.push({ id: 0, text: allSupportsLabel });
        for (var i = 0; i < self.allSupportAccounts.length; i++) {
            if (self.allSupportAccounts[i].parent == koAccount()) self.supportAccounts.pushAll(self.allSupportAccounts[i].children);
        }
    };

    self.setDivisions = function () {
        var koSupport = self.restriction().SupportAccount;
        if (self.supportAccounts().length == 0 || _.isVoid(koSupport())) return;

        // fetch the divisions filtered by support account
        self.divisions.popAll();
        if(allowSelectAll) self.divisions.push({ id: 0, text: allDivisionsLabel });
        if (koSupport() != 0) {
            for (var i = 0; i < self.allDivisions.length; i++) {
                if (self.allDivisions[i].parent == koSupport()) self.divisions.pushAll(self.allDivisions[i].children);
            }
        }
    };

    // ISSUE WITH COMPUTED
    // do this cause the computed are unable to trigger
    self.restriction().ClientAccount.subscribe(function (account) {
        self.setSupportAccounts();
    });

    self.restriction().SupportAccount.subscribe(function (support) {
        self.setDivisions();
    });

    self.initRestrictionRef = function (onEnd) {
        if (_.isVoid(self.clientAccounts())) {
            showLoader();
            try {
                $.get(window.rootUrl + "User/GetAccountsHierarchy").done(function (data) {
                    try {
                        // initialize the master dropdown (customer accounts)
                        var result = JSON.parse(data);
                        self.clientAccounts.pushAll(result.customerAccounts);
                        self.allSupportAccounts = result.supportAccounts;
                        self.allDivisions = result.divisions;

                        if (self.clientAccounts().length > 0) {
                            if (allowSelectAll) {
                                self.restriction().ClientAccount(self.clientAccounts()[0].id);
                                self.restriction().SupportAccount(0);
                                self.restriction().Division(0);
                            }
                            else {
                                self.restriction().ClientAccount("");
                                self.restriction().SupportAccount("");
                                self.restriction().Division("");
                            }
                        }
                        else {
                            self.restriction().ClientAccount("");
                            self.restriction().SupportAccount("");
                            self.restriction().Division("");
                        }
                    }
                    catch (e) {
                        self.restriction().ClientAccount("");
                        self.restriction().SupportAccount("");
                        self.restriction().Division("");
                        console.log(e.message + '\n' + e.description + '\n' + e.number);
                    }

                    hideLoader();

                    if (_.isFunction(onEnd)) onEnd();
                });
            }
            catch (e) {
                hideLoader();
                console.log(e.message + '\n' + e.description + '\n' + e.number);
            }
        }
        else {
            if (_.isFunction(onEnd)) onEnd();
        }
    };
};