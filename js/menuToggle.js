$(document).ready(function(){
    $('.selectors__button').click(function(){
        $('.menu').toggleClass('_detailed');

        if($('.menu').hasClass('_detailed') == false) {
            if($(this).attr('id') == 'provider_2') {
                var selected_provider_value = $('#main_provider').html();
                var provider_value = $('#provider').html();

                $('#main_provider').html(provider_value);
                $('#provider').html(selected_provider_value);
            }
        }
    });
});