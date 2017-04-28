
//Up to the .done is old code from week 7 with minor edits.
//I did get a little lazy after the .done and just based the structure off of the homework solution
//I do however understand how it works and how to write it.
//Only hickup was seems like giphy api is async and will sometimes 
//load the default images and sends the default images first onclick

//Everything is working how its suppose to locally, did not provide a heroku
//consolidated all old homework into a large git file



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
		movieButton.addClass("movies");
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
// was a test: console.log(this);
var theMovie = $(this).attr("data-value");
var limit = 10;
// //Problem keeps grabbing from the first button
// 	console.log(theMovie);
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
// was a test: console.log(response.data);
//for loop to generate the images with attributes
	for (i = 0; i<10; i ++) {
//created a div so it can be moved around after		
		var movieDiv = $('<div class="moveIt">')
//creating variables for specific data points to ease of coding		
		var rating = response.data[i].rating;
		var test = $("<p>").text("Rating: " + rating);
		var animated = response.data[i].images.fixed_height.url;
    	var still = response.data[i].images.fixed_height_still.url;
		var movieImage = $('<img>');
//adding multiple attributes for stills or animations for later use below		
		movieImage.attr("src", still);
		movieImage.attr("alt", "not working");
		movieImage.attr("data-still", still);
		movieImage.attr("data-animate", animated);
		movieImage.attr("data-state", "still");
		movieImage.attr("class", "clickme");
//appending to the div created before		
		movieDiv.append(test);
		movieDiv.append(movieImage);
//appending the div to the movie container		
		$('#giphyId').append(movieDiv);
		}
});
//End of the document on.click
});	

$(document).on("click", ".clickme", function() {

var state = $(this).attr("data-state");

if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
	}
else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
	}
 });

