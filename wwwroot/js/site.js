// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function(){
    $('.dropdown-submenu a.test').on("click", function(e){
      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
});

$('.readerFunctionEntry').click(function() {
    var userCardNumber = prompt('Please provide Card Number');
    var siteData = {"data": userCardNumber};
    var siteUrl = "/Home/IsUserValid";
   
    function callbackSucces(response) {
        if (response.responseText == "true") {
            $('.dropdown-submenu a.test').click();
        }
    }
    
    ajaxPost(siteUrl, siteData, callbackSucces);

});

function ajaxPost(siteUrl, siteData, callbackSucces) {
    $.ajax({
        type: "POST",
        url: siteUrl,
        data: siteData,
        dataType: "application/json",
        success: function(data) {
            callbackSucces(data);
        },
        error: function(status){
            callbackSucces(status);
            console.error("Error found while checking user Card number: \n" + status);
        }
    });
}