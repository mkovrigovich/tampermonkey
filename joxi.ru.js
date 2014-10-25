// ==UserScript==
// @name         joxi.ru
// @namespace    http://your.homepage/
// @version      0.1
// @description  joxi.ru
// @author       You
// @match        http://joxi.ru/*
// @grant        none
// ==/UserScript==

//location.href = document.getElementById('image').src;

$(function(){
  var src = $('.tile-image').find('img')[0].src;
//    console.log(img);
  location.href = src;
  //location.href = 'http://joxi.ru/' + img.src;
});