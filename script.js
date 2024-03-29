///////////////////////////////////// Collage Plus
// All images need to be loaded for this plugin to work so
// we end up waiting for the whole window to load in this example
// 
$(window).load(function() {
    $(document).ready(function() {
        // hide html to allow jquery/javascript to load
        document.getElementsByTagName("html")[0].hidden = false;
        
        //generates the Collage of pictures
        collage();     
        //$('.Collage').collageCaption();
        //For each picture, create a pop up modal that enlarges the picture
        var i = 1; //counter
        $(".hoverDiv img").each(function() {
            var imgsrc = $(this).attr('src');
            $("#popphoto" + i).attr("src", imgsrc); //create src attribute
            var a = $("<a>").attr({ //create a href with other attributes  
                href: "#popupParis" + i,
                "data-rel": "popup",
                "data-position-to": "window",
                "data-transition": "fade"
            });
            $(this).wrap(a); //wrap this img with link
            i = i + 1;
        }); //end img each
        //hide div when page loads
        $("#visibleDiv p").hide();
        //hover over images; replace .hover with text
        $(".hoverDiv img").hover(function() {
            hoverHandlerIn($(this));
        }, function() {
            $(".overlay").find("#" + $(this).attr('id')).hide();
            $(this).fadeTo(200, 1).end().remove(".overlay").hide("slow");
        });
    }); //end document ready
}); //end window load
//Create Google Analytics tracking

function gaTracking(gaq, nameID) {
    gaq.push(['_trackEvent', 'GA tracking for ' + nameID, 'clicked']);
}

function hoverHandlerIn(image) {
    //create an overlay that has similar attributes as img (width, height, position, etc.)
    var overlay = resizeOverlay($(".overlay"), image);
    // find specific description according to image ID
    overlay.find("#" + image.attr('id')).show();
    image.fadeTo(300, 0.2).end().add(".overlay").show("slow");
}

function resizeOverlay(ol, image) {
    var overlayWidth = image.width();
    var overlayHeight = image.height();
    var overlayPosition = image.position();
    var overlayOffsetLeft = image.offset().left;
    var overlayOffsetTop = image.offset().top;
    $(ol).css({
        "background-color": "black",
        "width": overlayWidth,
        "height": overlayHeight,
        "position": "absolute",
        "top": overlayOffsetTop,
        "left": overlayOffsetLeft,
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
// The expandNav controls hide and show navigation bar descriptions for (About Me, Projects, etc.)
window.currentNav = ""; //variable to check if the nav you clicked was the same as the previous nav

function expandNav(paraID) {
    // find the specific nav description and get its html
    // html() - Sets or returns the content of selected elements (including HTML markup); returns string
    $(".overlay").css("top", "-1000px"); // fixes bug which intereferes with nav descriptions
    var stringDescription = ($('#divExpandNav').find('#' + paraID)).html();
    // check if the nav you chose the nav you clickd on, and then show it
    if($('#visibleDiv p').is(":hidden") && currentNav == paraID) {
        $('#visibleDiv p').html("<p>" + stringDescription + "</p>").slideDown('fast');
    } //check if you clicked on another nav that's not currently displayed, and then show it
    else if($('#visibleDiv p').is(":hidden") && currentNav != paraID) {
        currentNav = paraID;
        $('#visibleDiv p').html("<p></p>").slideUp('fast');
        $('#visibleDiv p').html("<p>" + stringDescription + "</p>").slideDown('fast');
    } //check if you clicked on another nav that's currently displayed, and then show it
    else if($('#visibleDiv p').is(":visible") && currentNav != paraID) {
        $('#visibleDiv p').html("<p></p>").slideUp('fast');
        $('#visibleDiv p').html("<p>" + stringDescription + "</p>").slideDown('fast');
    } else // if the nav description is already showing
        $('#visibleDiv p').html("<p>" + stringDescription + "</p>").slideUp('fast');
    currentNav = paraID;
    console.log(currentNav);
}
// dynamically resize collage as window is resized
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