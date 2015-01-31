// ==UserScript==
// @name       catalog.onliner.by
// @namespace  http://catalog.onliner.by/
// @version    0.1
// @description  remove ads
// @match      *://catalog.onliner.by/*
// @copyright  2012+, You
// @grant unsafeWindow
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

window.addEventListener('load', function () {
    var active = true;
    var course = 15700;
    //Content script, image replacer
    
    var storesPrices = {
        'any': ['.price','.jshop_price > span'],
        'euroset.by': ['.jshop_price > span', '.old_price > span', '#block_price'],
        '21vek.by': '.g-price',
        'catalog.onliner.by': ['div.pprice_byr', 'div.b-offers-desc__info-sub', 'span.product-aside__price--primary', 'td.pprice'],
        'portative.by': ['.price .currency_ru', 'span.price'],
        '24shop.by': ['div.product-price > b', 'div.price-wrapper > div.price-usd', 'div.product-old-price > del'],
        'kufar.by': ['b.list_ads__price > span', '.adview_subject__amount'],
        'shop.by' : ['span[itemprop="lowPrice"]', 'span[itemprop="highPrice"]', 'span[itemprop="price"]', 'span.firstPrice', 'span.FirstPrice', 'span.price_item_value']
    };

    function replaceAll(str, search, replace){
        return str.split(search).join(replace);
    }
    
    //BlrUsd
    (function($) {
        //  $('head').append('<style>.blrUsdExtPrice { position: relative; top: -18px; left: -30px; color: green; font-size: 12px; font-weight: bold; }</style>');
        var self = {
            handlePrices : function(time)
            {
                var url = window.location.hostname;
                url = url.replace('www.','');
                if(url.indexOf('.shop.by') != -1){
                    url = 'shop.by';
                }
                if(url.substr(-3,3) != '.by'){
                    return false;
                }
                
                if(typeof storesPrices[url] != 'undefined'){
                    var storeClass = storesPrices[url];
                } else {
                    var storeClass = storesPrices['any'];
                }

                if(storeClass.constructor == Array){
                    $.each(storeClass, function (num, className) {
                        self.handleClass(className, time);
                    });
                } else {
                    self.handleClass(storeClass, time);
                }
                
                //Keep replacing
                if (time > 0) {
                    setTimeout(function () { self.handlePrices(time); }, time);
                }
            },
            
            handleClass: function(className, time)
            {
                var prices = $(className+':not(.blrUsdFixed)');
                $.each(prices, function (num, el) {
                    var priceCont = $(el);
                    
                    if(priceCont.children('.price-new').length > 0){
                        var priceSubCont = $(el).children('.price-new');
                        var oldPriceText = priceSubCont.text();
                        var belPrice = self.clearPrice(oldPriceText);

                        if(! isNaN(belPrice)){
                            var usdPrice = belPrice / course;
                            usdPrice = usdPrice.toFixed(2);
                            
                            priceSubCont.addClass('blrUsdFixed').attr('title',oldPriceText).text(usdPrice+'$');
                        }
                        var priceSubCont = $(el).children('.price-old');
                        var oldPriceText = priceSubCont.text();
                        var belPrice = self.clearPrice(oldPriceText);
                        if(! isNaN(belPrice)){
                            var usdPrice = belPrice / course;
                            usdPrice = usdPrice.toFixed(2);
                            priceSubCont.addClass('blrUsdFixed').attr('title',oldPriceText).text(usdPrice+'$');
                            priceCont.addClass('blrUsdFixed');
                        }
                    } else {
                        var oldPriceText = $(el).text();
                        var belPrice = self.clearPrice(oldPriceText);
                        console.log(belPrice);
                        if(belPrice){
                            var prices = [];
                            for (var i = 0; i < belPrice.length; i++) {
                                var usdPrice = belPrice[i] / course;
                            	usdPrice = usdPrice.toFixed(2) + '$';
                                prices.push(usdPrice);
                            // priceCont.append('<span class="blrUsdExtPrice">'+usdPrice+'$</span>');
                            }                            
                            
                            priceCont.addClass('blrUsdFixed').attr('title',oldPriceText).text(prices.join(' - '));
                        }
                    }
                });
            },
            
            clearPrice: function(text){
                text = replaceAll(text,'–','-');
                text = text.replace(/[\r\n]/mg, '');
                text = text.replace(/руб.*/mg, '');
                console.log(text);
                text = text.replace(/[^\d-–]/g, '');
                /*text = replaceAll(text,'от','');
                text = replaceAll(text,'&nbsp;','');
                text = replaceAll(text,'.','');
                text = replaceAll(text,',','');
                text = replaceAll(text,' ','');
                text = replaceAll(text,' ','');
                text = replaceAll(text,'	','');
                text = replaceAll(text,' ','');
                text = replaceAll(text,'руб','');
                text = replaceAll(text,'бр','');
                text = replaceAll(text,'BYR','');*/
                text = text.trim();
                
                //text = parseInt(text);
                return text.split('-');
            }
        };
        
        //Run on jQuery ready
        $(function () {
            self.handlePrices(1500);
            
        });
        
        //Set global variable
        $.BlrUsd = self;
    })(jQuery);
    //end BlrUsd
    
});