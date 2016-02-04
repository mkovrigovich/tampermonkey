// ==UserScript==
// @name         Onliner.by
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.onliner.by/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

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
