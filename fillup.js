// fillup.js
// https://github.com/jamiesonbecker/fillup.js
// Copyright (c) 2013 Jamieson Becker (MIT)

$.fn.fillup = function(src){return $(this).empty().html($("<div/>").addClass(src.slice(1)).html($(src + "-offstage").children().clone(false)))}
