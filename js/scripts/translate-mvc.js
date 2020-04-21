$(document).ready(function () {
    $("#language").change(function () {
        $.cookie("apiLang", $(this).val());
        $("form.language-selection").submit();
    });
});
