// ==UserScript==
// @name         FastPic
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://fastpic.ru/view/*
// @grant        none
// ==/UserScript==

console.log(document.getElementById('image'));
location.href = document.getElementById('image').src;