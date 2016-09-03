var dogs = ["pug", "daschund", "corgi", "poodle", "golden retreiver", "labrador", "french bulldog", "boston terrier", "pit bull", "collie"];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
var APIkey = "&api_key=dc6zaTOxFJmzC&limit=10";
var butt;

// loop over dog list and append a button for each
$(document).ready(function() {
	for (i = 0; i < dogs.length; i++) {
		butt = $("<button class='breed'>");
		butt.html(dogs[i]);
		butt.attr("data-breed", dogs[i]);
		$("#dogButtons").append(butt);
		
	}

// listens for dog button clicks and pulls gifs down via AJAX from giphyAPI using dog breed as search query
$(document).on('click', '.breed', function() {
	$(".pics").empty();
	console.log("clicked!");
	var animal = $(this).data('breed');
	var theURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: theURL, 
		method: 'GET'
	})

	// parses JSON object and appends dg animations to HTML page
	.done(function(response) {
	console.log(response);
	 var results = response.data;
	 var newDiv = $("<div>").addClass(animal);
	 for (i = 0; i < results.length; i++) {
	 	
	 	console.log(results.length);
	 	var par = $('<p>').html( "Rating: " + results[i].rating + "<br/>"	);
		var animalImage = $('<img class="dogpic" data-still="true">');

        animalImage.attr('src', results[i].images.fixed_height.url);
		animalImage.attr('data-still', results[i].images.fixed_height_still.url);
		animalImage.attr('data-animate', results[i].images.fixed_height.url);
		animalImage.attr('data-move', 'true');

        par.append(animalImage);
        newDiv.append(par);

	 }

	 $(".pics").append(newDiv);
		});	
	});

// adds a new user-defined button to button array in HTML
$("#submit").on('click', function() {
	var newAnimal = $("#adder").val().trim();
	console.log(newAnimal);
	if (newAnimal.length > 0 && dogs.indexOf(newAnimal) < 0) {
		butt = $("<button class='breed'>");
		butt.html(newAnimal);
		butt.attr("data-breed", newAnimal);
		$("#dogButtons").append(butt);
		dogs.push(newAnimal);
		
		}

	})

// animates or deanimates images based on click-state
$(document).on('click', '.dogpic', function() {
if ($(this).attr('data-move') == "true") {

	$(this).attr('src', $(this).data('still'));
	$(this).attr("data-move", "false");
}
else {

	$(this).attr('src', $(this).data('animate'));
	$(this).attr("data-move", "true");
	
}
});



});
