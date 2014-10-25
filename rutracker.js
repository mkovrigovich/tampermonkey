// ==UserScript==
// @name       rutracker.org
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  remove ads
// @match      http://rutracker.org/*
// @copyright  2012+, You
// ==/UserScript==

window.addEventListener('load', function () {
  $('td.tCenter.w100').remove();
  $('iframe').remove();
});
