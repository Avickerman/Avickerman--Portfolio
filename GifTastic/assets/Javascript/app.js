var topics = [
    "Hockey",
    "Boat",
    "Snowboard",
    "Snowmobile",
    "Fishing",
    "Hunting",
    "Golf",
    "wakeboarding",
    "wakesurfing",
    "Technology"
];

function makeButtons() {

    $('#buttonsView').empty();
    // loops through the interest array
    for (var i = 0; i < topics.length; i++) {

        var a = $('<button>')
        a.addClass('topic');
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $('#buttonsView').append(a);
    }
}


$("#addtopic").on("click", function () {



    var topic = $("#topic-input").val().trim();

    topics.push(topic);

    makeButtons();

    return false;
})

function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kxUAgdv3lE5c8ZEeic3Dt0udHl336Koq&rating=pg&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.data);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $('<div class=gifs>');
            var p = $("<p>").text("Rating: " + results[i].rating);
            var topicGif = $('<img>');
            topicGif.attr('src', results[i].images.fixed_height_still.url);
            topicGif.attr('data-still', results[i].images.fixed_height_still.url);
            topicGif.attr('data-state', 'still');
            topicGif.addClass('gif');
            topicGif.attr('data-animate', results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(topicGif)
            $("#gifsView").prepend(gifDiv);

        }



    });

}
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    };
});

$(document).on("click", ".topic", displayGifs);

makeButtons();
