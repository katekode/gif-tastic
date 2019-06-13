$(document).ready(function() {

    var arts = ["modern", "graphic", "animation", "graffiti"];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (let i = 0; i < arrayToUse.length; i++) {
            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);

            $(areaToAddTo).prepend(a);
        }
    }




    $(document).on("click", ".art-button", function() {
        $("#images").empty();

        $(".art-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit-10";



        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var artDiv = $("<div class=\"art-item\">");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var artImage = $("<img>");
                artImage.attr("src", still);
                artImage.attr("data-still", still);
                artImage.attr("data-animate", animated);
                artImage.attr("data-state", "still");
                artImage.attr("art-image");

                artDiv.prepend(p);
                artDiv.prepend(artImage);

                $("#images").prepend(artDiv);

            }

        });



    });



    $(document).on("click", ".art-image", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-art").on("click", function(event) {
        event.preventDefault();
        var newArt = $("input").eq(0).val();

        if (newArt.length > 2) {
            arts.push(newArt);

        }

        populateButtons(arts, "art-button", "#art-buttons");
    });

    populateButtons(arts, "art-button", "#art-buttons");



});