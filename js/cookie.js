/*
 * Достаем значение с ключем "provider" из кук
 * и возвращаем значение, если не существует, то возвращаем undefined
 */
function getProviderCookie() {
    var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + "provider".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}



/*
 * Берем выбранное пользователем значение provider и записываем их в куки
 * Вызывается каждый раз, когда переключается меню
 */
function setProviderCookie() {
    var provider = $('input.search__input').val();
    
    var expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 86400 * 365));

    document.cookie = "provider="  + provider + "; expires=" + expires.toGMTString() +  "; path=/";
}