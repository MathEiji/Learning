$(function () { // $ is the same as document.addeventListener("DOMContentLoaded" ...)
    $("#navbarToggle").blur(function (event) { //This function closes the dropdown menu if you click out of it.
        var screenWidth = window.innerWidth;
        if(screenWidth < 768){
            $("#navBarDropdown").collapse('hide');
        }
    });
});