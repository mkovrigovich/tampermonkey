// ==UserScript==
// @name        onliner-best-comments
// @namespace   http://onliner.by
// @match       *.onliner.by/*
// @grant       none
// @run-at      document-idle
// @version     0.1
//downloadURL https://bitbucket.org/liiws/habr-best-comments/downloads/habr-best-comments.user.js
//updateURL   https://bitbucket.org/liiws/habr-best-comments/downloads/habr-best-comments.meta.js
// @grant unsafeWindow
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==


// fix blocked broken ads
(function(){
  var wnd = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
  if (typeof wnd.adriver == "undefined") {
    wnd.adriver = function () { };
  }
})();

(function($){
  window.addEventListener('load', function () {
    // options
    var _fgAuthor = '#F76D59';
    var _bgAuthor = '#FFAA9D';
    var _fgPositiveMark = '#339900';
    var _fgNegativeMark = '#CC0000';
    var _bgColor = '#F8F8F8';
    var _bgColorNew = '#E8E8FF';
    var _bgColorSelected = '#3D438D';

    /*
     var authorElement = $(".post-type__value.post-type__value_author");
     if (authorElement.length == 0) {
     authorElement = $(".author-info__name:last");
     }
     if (authorElement.length == 0) {
     authorElement = $(".author-info__nickname:last");
     }
     var authorName = authorElement.length == 0 ? "" : authorElement.attr("href").split("/").pop();
     */
    ShowCommentsPanel('len');


    // update button
    $('a.refresh').click(function () {
      $('.hbc').remove();
      setTimeout(function () {
        WaitForCommentsWillBeLoadedAndUpdateComments();
      }, 500);

      function WaitForCommentsWillBeLoadedAndUpdateComments() {
        if ($('a.refresh').hasClass('loading')) {
          // wait till update end
          setTimeout(WaitForCommentsWillBeLoadedAndUpdateComments, 100);
        }
        else {
          // update comments
          ShowCommentsPanel();
        }
      }
    });



    function ShowCommentsPanel(mode) {
      var allComments = GetAllComments(mode);
      ShowComments(allComments, mode);
    }

    function GetAllComments(mode) {
      var allComments = [];
      $('ul.b-comments-1__list li.commentListItem').each(function (index, item) {
        var id = $(item).attr('id');
        var markItem = $('._counter', item);
        var userName = $.trim($('.author', item).text());
        var mark = parseInt(markItem.text().match(/\d+/));
        var hasImg = $('.comment-content > p', item).find('a').length > 0;
        var len = $('.comment-content > p', item).text().length;

        allComments.push(
          {
            id: id,
            len: len,
            mark: mark,
            isAuthor: false/*userName*/,
            hasImg: hasImg
          });
      });

      if (mode == 'rating') {
        // remove comments without mark
        allComments = allComments.reduce(function (prev, cur) {
          if (!isNaN(cur.mark)) {
            prev.push(cur);
          }
          return prev;
        }, []);

        // best desc, time asc
        allComments.sort(function (a, b) {
          return a.mark == b.mark
            ? (a.id < b.id ? 1 : -1)
            : ((isNaN(a.mark) ? 0 : a.mark) > (isNaN(b.mark) ? 0 : b.mark) ? 1 : -1)
        });
        allComments.reverse();
      }

      if (mode == 'len') {
        // remove comments without mark
        allComments = allComments.reduce(function (prev, cur) {
          if (!isNaN(cur.len)) {
            prev.push(cur);
          }
          return prev;
        }, []);

        // best desc, time asc
        allComments.sort(function (a, b) {
          return a.len == b.len
            ? (a.id < b.id ? 1 : -1)
            : ((isNaN(a.len) ? 0 : a.len) > (isNaN(b.len) ? 0 : b.len) ? 1 : -1)
        });
        allComments.reverse();
      }




      return allComments;
    }


    function ShowComments(comments, mode) {
      var wnd = $('<div class="hbc" style="width: 70px; top: 55px; bottom: 10px; right: 32px; z-index:200; overflow: auto; position: fixed;"></div>');
      $(wnd).css('background-color', _bgColor);
      $('body').append(wnd);
      $(wnd).append($('<div class="load_rating">rating</div>'));
      $(wnd).append($('<div class="load_len">len</div>'));
      $.each(comments, function (index, comment) {
        // create item
        var item = $('<div class="hbc__item" style="text-align: right;"><a href="#">0</a></div>');
        $('a', item).attr('href', '#' + comment.id);
        if (mode == 'rating') {
          $('a', item).text(isNaN(comment.mark) ? '?' : (comment.mark >= 0 ? '+' + comment.mark : comment.mark));
        }

        if (mode == 'len') {
          $('a', item).text(comment.len);
        }

        // mark color
        if (comment.mark >= 0)
          $('a', item).css('color', _fgPositiveMark);
        else
          $('a', item).css('color', _fgNegativeMark);

        if (comment.isAuthor) {
          $('a', item).before('<span style="color: ' + _fgAuthor + '; font-weight: bold;">A </span>');
        }
        if (comment.hasImg) {
          $('a', item).before('<span style="color: blue; font-weight: bold;">i </span>');
        }

        // onclick event
        $(item).bind('click', Comment_OnClick);

        // add item
        $(wnd).append(item);
      });

      $('div.load_rating').click(function () {
        ShowCommentsPanel('rating');
      });
      $('div.load_len').click(function () {
        ShowCommentsPanel('len');
      });

      // highlight author name
      //$('a.comment-item__username:contains("' + authorName + '")').css('background-color', _bgAuthor);
    }

    function Comment_OnClick() {
      $('.hbc__item').css('background-color', _bgColor);
      $('.hbc__item-when-new').css('background-color', _bgColorNew);
      $(this).css('background-color', _bgColorSelected);
    }
  });

})(jQuery);