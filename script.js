///////////////////////////////////// Collage Plus
// All images need to be loaded for this plugin to work so
// we end up waiting for the whole window to load in this example
// 
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
        //////////////////////////////////
        $("#visibleDiv p").hide();
        /////////////////////////////// hover over images; replace .hover with text
        var ol = $(".overlay");
        $(".hoverDiv img").hover(function() {
            //create an overlay that has similar attributes as img (width, height, position, etc.)
            var overlay = createOverlay(ol, $(this));
            // find specific description according to image ID
            overlay.find("#" + $(this).attr('id')).show();
            $(this).fadeTo(300, 0.2).end().add(".overlay").show("slow");
        }, function() {
            $(".overlay").find("#" + $(this).attr('id')).hide();
            $(this).fadeTo(200, 1).end().remove(".overlay").hide("slow");
        });
    }); //end document ready
}); //end window load

function createOverlay(ol, image) {
    var overlayWidth = image.width();
    var overlayHeight = image.height();
    var overlayPosition = image.position();
    var overlayOffsetLeft = image.offset().left;
    var overlayOffsetTop = image.offset().top;
    $(ol).css({
        "top": overlayOffsetTop,
        "left": overlayOffsetLeft,
        "background-color": "black",
        "width": overlayWidth,
        "height": overlayHeight,
        "position": "absolute",
        "z-index": 0
    });
    return ol;
}
// Here we apply the actual CollagePlus plugin

function collage() {
    $('.Collage').removeWhitespace().collagePlus({
        'fadeSpeed': 1100,
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
    $(".overlay").css("top","-1000px"); // fixes bug which intereferes with nav descriptions
    // find the specific nav description and get its html
    // html() - Sets or returns the content of selected elements (including HTML markup); returns string
    var stringDescription = ($('#divExpandNav').find('#'+paraID)).html();
    if($('#visibleDiv p').is(":hidden"))
        $('#visibleDiv p').html("<p>" + stringDescription + "</p>").slideDown('fast');
    else
        $('#visibleDiv p').html("<p>" + stringDescription + "</p>").slideUp('fast');
    //     if you clicked on a paraID, everything hides except the paraID you clicked on 
    //     $('#divExpandNav p').not($('#divExpandNav #' + paraID)).slideUp('fast');
    //     if($('#divExpandNav #' + paraID).is(":visible")) {
    //         $('#divExpandNav #' + paraID).slideUp('fast');
    //     }
    //     if($('#divExpandNav #' + paraID).is(":hidden")) {
    //         $('#divExpandNav #' + paraID).slideDown('fast');
    //     }
}
//////////////////////////////
// popup examples
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
///////////////////////