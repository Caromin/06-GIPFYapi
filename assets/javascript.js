//main array that future inputs will be pushed into	
var movieArray = ["frozen", "saving private ryan", "john wick", "rouge one", "ex machina", "edge of tomorrow", "dr strange", "shutter island"];
   
//initial start up when the page loads
startUp();


//used to generated the buttons
function startUp() {
//emptys the section at the start
//when the onclick happens there is no repeat
	$('#imagesId').empty();

//for loop that will generate the buttons
	for (i =0; i <movieArray.length; i++) {
		var movieButton = $('<button>');
		movieButton.addClass("movies p-2");
		movieButton.text(movieArray[i]);
		movieButton.attr("data-value", movieArray[i]);
		$('#imagesId').append(movieButton);
//checking to see if the loop is moving through the array correctly.		
	}
}


//on click button used to push inputs into arrays	
$('#pushButton').on("click", function(event) {
	event.preventDefault();
//looking at the #pushitem input and taking the value of whatever was inputted				
	var movieInput = $('#pushItem').val().trim();
	movieArray.push(movieInput);
	startUp();

});

//on click that will run when a button with a .movies class is clicked.
$(document).on("click", ".movies", function() {
//Empty the container if there is any images in there at the moment.
$('#giphyId').empty();

var theMovie = $(this).attr("data-value");
// limit the gifs to only 10 images
var limit = 10;

//---------------------------------------------		
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    theMovie + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";


//The GET request from giphy
$.ajax({
    url: queryURL,
    method: "GET"
    })

// Once it is finished running a function to save results
.done(function(response) { 
//for loop to generate the images with attributes
	for (i = 0; i<limit; i ++) {
//created a div so it can be moved around after		
		var movieDiv = $('<div class="p-2">')
//creating variables for specific data points to ease of coding		
		var rating = response.data[i].rating;
		var text = $("<p>").text("Rating: " + rating);
		var animated = response.data[i].images.fixed_height.url;
    	var still = response.data[i].images.fixed_height_still.url;
		var movieImage = $('<img>');
// default is using src still url	
		movieImage.attr("src", still);
// if the img did not work, this would show in text		
		movieImage.attr("alt", "not working");
// data-value of still		
		movieImage.attr("data-still", still);
// data-value of animated url		
		movieImage.attr("data-animate", animated);
// data-value of still url		
		movieImage.attr("data-state", "still");
// put all generated images in a class called click me		
		movieImage.attr("class", "clickme");
//appending the text and the gift inside the movieDiv then appending movieDiv into the giphyID div	
		movieDiv.append(text);
		movieDiv.append(movieImage);	
		$('#giphyId').append(movieDiv);
		}
});
//End of the document on.click
});	

// an onclick event to change the gifs on and of states
$(document).on("click", ".clickme", function() {

// setting a variable to the current data-state
var state = $(this).attr("data-state");

// if the data-state is a still, then change the state to animate
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
	}
// else change the data	to a still
else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
	}
 });

