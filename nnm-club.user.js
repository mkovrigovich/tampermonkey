// ==UserScript==
// @name       nnm-club
// @namespace  http://nnm-club.me/
// @version    0.1
// @description  remove ads
// @match      *://nnm-club.me/*
// @copyright  2012+, You
// @grant unsafeWindow
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

window.addEventListener('load', function () {
    jQuery('div.pb_left_banner').remove();
    jQuery('div.pb_top_img').remove();
    jQuery('div.pb_right_banner').remove();
    jQuery('body').css({'padding':0});
    jQuery('div.wrap').css({'top':0});
    jQuery('[id*=MarketGidComposite]').remove();
    jQuery('iframe').remove();
    jQuery('[id*=bn_]').remove();
    jQuery('.header .row2').remove();
    jQuery('#mb_top_space').remove();
});

function clearIt(items)
{
    do {
        var len = items.length;
   
        for(var i in items) {
            if (items.hasOwnProperty(i)) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    } while (len);
}


clearIt(document.getElementsByTagName('iframe'));
clearIt(document.getElementsByClassName('DA-BLOCK'));
clearIt(document.getElementsByClassName('kdmTeaserBlock'));

