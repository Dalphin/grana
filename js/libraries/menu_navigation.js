/*Init menu*/

function badge_menu_display() {
    var badge = $('.carte').parent().parent().parent('li').find('a:first-child');
    if (!$(badge).next('ol').is(':visible')) {
        $('nav ol:visible').slideUp();
        $('nav .open').removeClass('close');

        $(badge).next('ol').slideDown();

        $(badge).addClass('close');
        $('.carte').removeClass('close');
        $('.badge').removeClass('close');
        $('.badge').addClass('active');

    }
}

function card_menu_display() {
    var card = $('.carte').parent().parent().parent('li').find('a:first-child');
    if (!$(card).next('ol').is(':visible')) {
        $('nav ol:visible').slideUp();
        $('nav .open').removeClass('close');

        $(card).next('ol').slideDown();

        $(card).addClass('close');
        $('.carte').removeClass('close');
        $('.badge').removeClass('close');
        $('.carte').addClass('active');

    }
}

function alert_menu_display() {
    var alert = $('li a.alerte').parent().parent().parent('li').find('a:first-child');
    if (!$(alert).next('ol').is(':visible')) {
        $('nav ol:visible').slideUp();
        $('nav .open').removeClass('close');

        $(alert).next('ol').slideDown();

        $(alert).addClass('close');
        $('li a.amende').removeClass('close');
        $('li a.alerte').removeClass('close');
        $('li a.alerte').addClass('active');
    }
}

function fine_menu_display() {
    var fine = $('li a.amende').parent().parent().parent('li').find('a:first-child');
    if (!$(fine).next('ol').is(':visible')) {
        $('nav ol:visible').slideUp();
        $('nav .open').removeClass('close');

        $(fine).next('ol').slideDown();

        $(fine).addClass('close');
        $('li a.amende').removeClass('close');
        $('li a.alerte').removeClass('close');
        $('li a.amende').addClass('active');
    }
}

function invoice_menu_display() {
    var invoice = $('.facture').parent().parent().parent('li').find('a:first-child');
    if (!$(invoice).next('ol').is(':visible')) {
        $('nav ol:visible').slideUp();
        $('nav .open').removeClass('close');

        $(invoice).next('ol').slideDown();

        $(invoice).addClass('close');
        $('.facture').removeClass('close');
        $('.contrat').removeClass('close');
        $('.facture').addClass('active');

    }
}

function supplier_menu_display() {
    var supplier = $('li a.contrat').parent().parent().parent('li').find('a:first-child');
    if (!$(supplier).next('ol').is(':visible')) {
        $('nav ol:visible').slideUp();
        $('nav .open').removeClass('close');

        $(supplier).next('ol').slideDown();

        $(supplier).addClass('close');
        $('li a.facture').removeClass('close');
        $('li a.contrat').removeClass('close');
        $('li a.contrat').addClass('active');
    }
}

window.popinProcessId = "PopInProcess";
window.popinprocesshandler = null;




function grUtagLink(parameters) {
    try {
        if (typeof parameters === "undefined" || parameters === null) {
            return;
        }

        utag.link({
            event_attr1: parameters.event_attr1,
            event_attr2: parameters.event_attr2,
            country: parameters.country,
            page_section: parameters.page_section,
            page_category: parameters.page_category,
            page_subcategory: parameters.page_subcategory
        });
    }
    catch (e) {
        console.error(e);
    }
}

function grUtagView(parameters) {
    try {
        if (typeof parameters === "undefined" || parameters === null) {
            return;
        }

        utag.view({
            site_name: parameters.site_name,
            country: parameters.country,
            language: parameters.language,
            page_section: parameters.page_section,
            page_category: parameters.page_category,
            page_subcategory: parameters.page_subcategory,
            page_name: parameters.page_name,
            search_term: parameters.search_term,
            search_results: parameters.search_results,
            search_page: parameters.search_page,
            customer_id: parameters.customer_id,
            customer_type: parameters.customer_type,
            env_type: parameters.env_type
        });
    }
    catch (e) {
        console.error(e);
    }
}



