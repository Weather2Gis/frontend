$(document).ready(function(){
    $('.selectors__button').click(function(){
        $('.menu').toggleClass('_detailed');

        if($('.menu').hasClass('_detailed') == false)
        {
            if($(this).attr('id') == 'provider_2')
            {
                var provider_1_value = $('#provider_1').html();
                var provider_2_value = $('#provider_2').html();

                $('#provider_1').html(provider_2_value);
                $('#provider_2').html(provider_1_value);
            }
        }
    });
});