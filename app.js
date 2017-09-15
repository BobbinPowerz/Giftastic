$(document).ready(function() {

	var topics = ["frenchie", "donkey", "kitten", "badger", "pig", "alligator", "elephant"];
	     
		function renderButtons() {

		$("#animalButtons").empty();

			for (var i = 0; i < topics.length; i++) {
			 
			  var inBtn = $("<button>");
			 
			
			  inBtn.attr("data-name", topics[i]);
			
			  inBtn.text(topics[i]);
		
			  $("#animalButtons").append(inBtn);
			}
		};

		 $("#add-animal").on("click", function(event) {
		 	event.preventDefault();

		 	var added = $("#animal-input").val().trim();
		 	topics.push(added);
		 	console.log(topics);
		 	renderButtons();
		 	fetch();
		 	$("#animal-form").find("input:text").val("");

		  });
		// inBtn.attr("data-name", added);
		// // The movie from the textbox is then added to our array
		// buttns.push(added);
		// console.log(buttns);
		// // calling renderButtons which handles the processing of our movie array
		// renderButtons();
		// $("#animal-form").find("input:text").val("");
		// });

	renderButtons();


	function fetch() {

		

		$("button").on("click", function() {
			$("#gifs-here").empty();

		var animal = $(this).attr("data-name");
		console.log(this);

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		animal + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
			url: queryURL,
			method: "GET"
			})
			.done(function(response) {
			console.log(queryURL);
			console.log(response);
			// storing the data from the AJAX request in the results variable
				var results = response.data;
					// Looping through each result item
					for (var i = 0; i < results.length; i++) {
					// Creating and storing a div tag
					var animalDiv = $("<div>");
					// Creating a paragraph tag with the result item's rating
					var rated = $("<p>").text("Rating: " + results[i].rating);
					// Creating and storing an image tag
					var animalImage = $("<img>");
					// Setting the src attribute of the image to a property pulled off the result item
					animalImage.attr("src", results[i].images.fixed_height_still.url);
					animalImage.attr("data-animate", results[i].images.fixed_height.url);
					animalImage.attr("data-still", results[i].images.fixed_height_still.url);
					animalImage.attr("data-state", "still");



						animalImage.on("click", function() {
							var state = $(this).attr("data-state");
							if (state === "still") {
							$(this).attr("src", $(this).attr("data-animate"));
							$(this).attr("data-state", "animate");
							} else {
								$(this).attr("src", $(this).attr("data-still"));
								$(this).attr("data-state", "still");
								console.log('IT IS STILL');
							};
						});
					// Appending the paragraph and image tag to the animalDiv
					animalDiv.append(rated);
					animalDiv.append(animalImage);
					
					$("#gifs-here").prepend(animalDiv);
					}
			});

		});

		// $("#gifs-here").html("");
	};

	fetch();

});
