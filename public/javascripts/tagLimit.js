// This ensures that only a certain number of tags (3) can be attached to a question
$(document).ready(function () {
    $("input[name='tag']").change(function () {
        const maxAllowed = 3;
        var nbBoxesChecked = $("input[name='tag']:checked").length;
        if (nbBoxesChecked > maxAllowed) {
            $(this).prop("checked", "");
            $(this).parent().removeClass("active");
            alert("Please select at most " + maxAllowed + " tags.")
        }
    });
});