
(function(w) {
    w.gra = { utag: null };
    w.gra.utag = {
        jsLink: "",
        environment: "",
        site: "",
        country: "",
        language: "",
        section: "",
        customerId: "",
        customerType: "",
        currentFilter: "",
        disableLog: true,
        key1: {
            Export: "Export",
            download: "download",
            filter: "Filter",
            close: "Close",
            addAttachment: "AddAttachment",
            Import: "Import",
            help: "Help",
            action: "A",
        },
        key2: {
            download: "T",
            action: "A",
            navigate: "N"
        },
        isVarEmpty: function(v) {
            return v === null || v === "" || typeof v === "undefined";
        },
        init: function (link, e, s, c, l, cid, ctp) {
            this.jsLink = link;
            this.environment = e;
            this.site = s;
            this.country = c;
            this.language = l;
            this.customerId = cid;
            this.customerType = ctp;
            this.disableLog = (e == "prod");
        },
        setData: function (pageName, category) {
            this.log('section: ' + this.section + ', data: p=' + pageName + ',c=' + (this.isVarEmpty(category) ? "" : category)+ ',customer_id=' + (this.isVarEmpty(this.customerId) ? "" : this.customerId));
            w.utag_data = {
                site_name: this.site,
                country: this.country,
                language: this.language,
                page_section: this.section,
                page_category: (this.isVarEmpty(category) ? "" : category),
                page_subcategory: '',
                page_name: pageName,
                search_term: '',
                search_results: '',
                search_page: '1',
                customer_id: this.customerId,
                customer_type: this.customerType,
                env_type: this.environment
            };

            return w.utag_data;
        },
        traceExport: function (category, subCategory) {
            this.traceDownload(this.key1.Export, category, subCategory);
        },
        traceDownload: function (type, category, subCategory) {
            try {
                this.traceLink((this.isVarEmpty(type) ? this.key1.download : type), this.key2.download, category, subCategory);
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceNav: function (nav, category, subCategory) {
            try {
                this.traceLink(nav, this.key2.navigate, category, subCategory);
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceUpload: function (type, category, subCategory) {
            try {
                this.traceLink(type, this.key2.action, category, subCategory);
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceFilter: function (subCategory) {
            try {
                this.traceLink(this.key1.filter, this.key2.action, this.currentFilter, subCategory);
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceClose: function (category, subCategory) {
            try {
                this.traceLink(this.key1.close, this.key2.action, category, subCategory);
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceHelp: function (category, subCategory) {
            try {
                this.traceLink(this.key1.help, this.key2.download, category, subCategory);
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceLink: function (at1, at2, category, subCategory) {
            if (typeof w.utag === "undefined") return;
            this.log('section: ' + this.section + ', link: a1=' + at1 + ',a2=' + at2 + ',c=' + (this.isVarEmpty(category) ? "" : category) + ',sc=' + (this.isVarEmpty(subCategory) ? "" : subCategory));
            try {
                w.utag.link({
                    event_attr1: at1,
                    event_attr2: at2,
                    country: this.country,
                    page_section: this.section,
                    page_category: (this.isVarEmpty(category) ? "" : category),
                    page_subcategory: (this.isVarEmpty(subCategory) ? "" : subCategory)
                });
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceArchLink: function (at1, at2) {
            if (typeof w.utag === "undefined") return;
            this.log('section: ' + this.section + ', link(arch): a1=' + at1 + ',a2=' + at2);
            try {
                w.utag.link({
                    event_attr1: at1,
                    event_attr2: at2,
                    country: this.country,
                    page_section: "Arch",
                    page_category: "",
                    page_subcategory: ""
                });
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        traceView: function (name, category, subCategory) {
            if (typeof w.utag === "undefined") return;
            this.log('section: ' + this.section + ', view: page=' + name + ',c=' + (this.isVarEmpty(category) ? "" : category) + ',sc=' + (this.isVarEmpty(subCategory) ? "" : subCategory) + ',customer_id=' + (this.isVarEmpty(this.customerId) ? "" : this.customerId));
            try {
                w.utag.view({
                    site_name: this.site,
                    country: this.country,
                    language: this.language,
                    page_section: this.section,
                    page_category: (this.isVarEmpty(category) ? "" : category),
                    page_subcategory: (this.isVarEmpty(subCategory) ? "" : subCategory),
                    page_name: name,
                    search_term: '',
                    search_results: '',
                    search_page: '1',
                    customer_id: this.customerId,
                    customer_type: this.customerType,
                    env_type: this.environment
                });
            }
            catch (e) {
            	w.console.error(e);
            }
        },
        log: function (text) {
            if (this.disableLog) return;
            w.console.log(text);
        }
    };

})(window);
