///////////////////////////////////// Collage Plus
// All images need to be loaded for this plugin to work so
// we end up waiting for the whole window to load in this example
$(window).load(function() {
    $(document).ready(function() {
        collage();
        $('.Collage').collageCaption();
        //////////////////////////////
        var i = 1; //counter
        $(".Collage img").each(function() {
            var imgsrc = $(this).attr('src');
            $("#popphoto" + i).attr("src", imgsrc); //create src attrivute
            var a = $("<a>").attr({ //create a href with other attributes  
                href: "#popupParis" + i,
                "data-rel": "popup",
                "data-position-to": "window",
                "data-transition": "fade"
            });
            $(this).wrap(a); //wrap this img with link
            i = i + 1;
        }); //end img each
        $('p').css('display', 'none');
    }); //end document ready
}); //end window load
// Here we apply the actual CollagePlus plugin

function collage() {
    $('.Collage').removeWhitespace().collagePlus({
        'fadeSpeed': 2000,
        'targetHeight': 200
    });
};
// This is just for the case that the browser window is resized
var resizeTimer = null;
$(window).bind('resize', function() {
    // hide all the images until we resize them
    $('.Collage .Image_Wrapper').css("opacity", 0);
    // set a timer to re-apply the plugin
    if(resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200);
});
//////////////////// control hide and show navigation bar

function expandNav(paraID) {
    if($('#divExpandNav #' + paraID).is(":visible")) {
        $('#divExpandNav #' + paraID).slideUp('fast');
    }
    if($('#divExpandNav #' + paraID).is(":hidden")) {
        $('#divExpandNav #' + paraID).slideDown('fast');
    }
    $('#divExpandNav p').not($('#divExpandNav #' + paraID)).slideUp('fast');
    $('#divExpandNav p').not($('#divExpandNav #' + paraID)).slideUp('fast');
    if($('#divExpandNav #' + paraID).is(":visible")) $('#divExpandNav #' + paraID).slideUp('fast');
    if($('#divExpandNav #' + paraID).is(":hidden")) $('#divExpandNav #' + paraID).slideDown('fast');
}
/////////////////////////////// popup video examples
//////////////////////////////
// popup examples
$(document).on("pagecreate", function() {
    // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
    function scale(width, height, padding, border) {
        var scrWidth = $(window).width() - 30,
            scrHeight = $(window).height() - 30,
            $(document).on("pagecreate", function() {
                // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
                function scale(width, height, padding, border) {
                    var scrWidth = $(window).width() - 30,
                        scrHeight = $(window).height() - 30,
                        ifrPadding = 2 * padding,
                        ifrBorder = 2 * border,
                        ifrWidth = width + ifrPadding + ifrBorder,
                        ifrHeight = height + ifrPadding + ifrBorder,
                        h, w;
                    if(ifrWidth < scrWidth && ifrHeight < scrHeight) {
                        w = ifrWidth;
                        h = ifrHeight;
                    } else if((ifrWidth / scrWidth) > (ifrHeight / scrHeight)) {
                        w = scrWidth;
                        h = (scrWidth / ifrWidth) * ifrHeight;
                    } else {
                        h = scrHeight;
                        w = (scrHeight / ifrHeight) * ifrWidth;
                    }
                    return {
                        'width': w - (ifrPadding + ifrBorder),
                        'height': h - (ifrPadding + ifrBorder)
                    };
                };
                $(".ui-popup iframe").attr("width", 0).attr("height", "auto");
                $("#popupVideo").on({
                    popupbeforeposition: function() {
                        // call our custom function scale() to get the width and height
                        var size = scale(497, 298, 15, 1),
                            w = size.width,
                            h = size.height;
                        $("#popupVideo iframe").attr("width", w).attr("height", h);
                    },
                    popupafterclose: function() {
                        $("#popupVideo iframe").attr("width", 0).attr("height", 0);
                    }
                });
            });
        if(ifrWidth < scrWidth && ifrHeight < scrHeight) {
            w = ifrWidth;
            h = ifrHeight;
        } else if((ifrWidth / scrWidth) > (ifrHeight / scrHeight)) {
            w = scrWidth;
            h = (scrWidth / ifrWidth) * ifrHeight;
        } else {
            h = scrHeight;
            w = (scrHeight / ifrHeight) * ifrWidth;
        }
        return {
            'width': w - (ifrPadding + ifrBorder),
            'height': h - (ifrPadding + ifrBorder)
        };
    };
    $(".ui-popup iframe").attr("width", 0).attr("height", "auto");
    $("#popupVideo").on({
        popupbeforeposition: function() {
            // call our custom function scale() to get the width and height
            var size = scale(497, 298, 15, 1),
                w = size.width,
                h = size.height;
            $("#popupVideo iframe").attr("width", w).attr("height", h);
        },
        popupafterclose: function() {
            $("#popupVideo iframe").attr("width", 0).attr("height", 0);
        }
    });
});
///////////////////////