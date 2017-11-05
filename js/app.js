


// $("button").click(function(){
//     console.log($(this).attr("data-source"));

// })

$("#searchBtn").click(function(event){
    event.preventDefault();
    createButton($("#textBox").val())
    generateGifs($("#textBox").val())
    
});
$('#textBox').keypress(function (e) {
    if (e.which == 13) {
        createButton($("#textBox").val())
        generateGifs($("#textBox").val())
      return false;    //<---- Add this line
    }
  });
function createButton(value){
    var button = $("<button>").attr("data-source", value).attr("class", "sections button-secondary pure-button").text(value)
    $("#sectionButtons").append(button);

    $(".sections").click(function(){
        console.log("s")
        generateGifs(this)
    })
}

function generateGifs(button){
    var limit = 10;
    var query = button;
    console.log(button)
    var URL = "https://api.giphy.com/v1/gifs/search?q=" +
    query + "&api_key=dc6zaTOxFJmzC&limit=" + limit;
    $.ajax({
        url: URL,
        method: "GET"
    }).done(function(event){
        $("#images").empty()
        var images = event.data;
        for (var i = 0; i < images.length; i++){
            // console.log(images[i])
            //var imageUrl = images[i].images.original_still.url;
            var imageOriginalAnimate = images[i].images.original.url;
            var imageOriginalStill = images[i].images.original_still.url;
            $("#images").append($("<img>").attr("src", imageOriginalStill)
            .attr("data-still", imageOriginalStill)
            .attr("data-animate", imageOriginalAnimate)
            .attr("data-state", "still")
            .attr("class", "gifs"))

            $("#images").append($("<h4>").text("Rating: " + images[i].rating))
            $("#images").append($("</br>"))


        }
        $(".gifs").click(function(){
            console.log(this)
            if ($(this).attr("data-state") === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate")
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still")
            }
            
        });
        // console.log(event)
        // $("#images").append($("<img>").attr("src", event.))
    })
}



