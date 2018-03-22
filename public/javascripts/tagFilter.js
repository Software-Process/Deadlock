// This ensures that only one tag can be selected at a time.
var selected;
$(document).ready(function () {
    $("input[name='tag']").change(function () {
        const maxAllowed = 1;
        $('.button-div a').on('click', function(){
    var getButton = $(this).attr('class');
    $('.button-div a').removeClass('active');
    $('.button-div a.' + getButton).addClass('active');
}
    });
});