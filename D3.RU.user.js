// ==UserScript==
// @name         D3.RU
// @namespace    http://d3.ru/
// @version      0.1
// @description  remove ads
// @author       You
// @match        *.d3.ru/*
// @grant        unsafeWindow
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

window.addEventListener('load', function () {
    jQuery('.b-img_banner').remove();
    //jQuery('#js-fixed_sidebar').remove();
});
