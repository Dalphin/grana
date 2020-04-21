function CreateSlider(elem, min, max)
{
    $('#' + elem).parent('.filtre_option').find('.sliderMinOriginal').attr('value', min)
    $('#' + elem).parent('.filtre_option').find('.sliderMaxOriginal').attr('value', max)
    ChangeSliderValues(elem, min, max)

    $('#' + elem).slider({
        range: true,
        min: min,
        max: max,
        values: [min, max],
        change: function (event, ui) {
            ChangeSliderValues(elem, ui.values[0], ui.values[1])
        },
        slide: function (event, ui) {
            $('#' + elem).parent('.filtre_option').find('.sliderMinDisplay').text(ui.values[0])
            $('#' + elem).parent('.filtre_option').find('.sliderMaxDisplay').text(ui.values[1])
        }
    });
}

function ChangeSliderValues(elem, min, max)
{
    $('#' + elem).parent('.filtre_option').find('.sliderMinDisplay').text(min)
    $('#' + elem).parent('.filtre_option').find('.sliderMaxDisplay').text(max)

    $('#' + elem).parent('.filtre_option').find('.sliderMinValue').attr('value', min)
    $('#' + elem).parent('.filtre_option').find('.sliderMaxValue').attr('value', max)
}