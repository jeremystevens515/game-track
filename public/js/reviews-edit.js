const editBtn = document.getElementById("edit-btn");
const textDisplayEl = document.getElementById("text-display");
const textEditorEl = document.getElementById("text-editor");

// const editText = (event) => {
// 	event.stopPropagation();
// 	console.log("you clicked the edit button");

// 	// if button says edit
// 	if (editBtn.innerHTML == "Edit") {
// 		// change button to submit
// 		editBtn.innerHTML = "Submit";
// 	} else {
// 		// change button to edit
// 		editBtn.innerHTML = "Edit";

// 		const gameID = event.target.getAttribute("data-gameId");
// 		console.log("gameID: ", gameID);
// 		const reviewText = document.getElementById("text-editor-textarea").value;
// 		// editReview(gameID, reviewText);
// 	}

// 	// if reivew text is visible
// 	if (textDisplayEl.dataset.visible == "true") {
// 		textDisplayEl.dataset.visible = "false";
// 		textDisplayEl.setAttribute("style", "display: none");

// 		textEditorEl.removeAttribute("style");
// 		textEditorEl.dataset.visible = "true";

// 		console.log("text display data-visible", textDisplayEl.dataset.visible);
// 	} else {
// 		textEditorEl.dataset.visible = "false";
// 		textEditorEl.setAttribute("style", "display: none");

// 		textDisplayEl.dataset.visible = "true";
// 		textDisplayEl.removeAttribute("style");
// 		console.log("text display visible");
// 	}
// };

const editReview = (event) => {
	const textValue = document.getElementById("textarea-text").value;
	const ratingValue = document.getElementById("rating").value;
	const data = {
		review_text: textValue,
		rating: ratingValue,
	};

	fetch(`${document.location.pathname}`, {
		method: "PUT",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		if (res.ok) {
			document.location.replace("/user/reviews");
		} else {
			console.log("There was a problem with your PUT request");
		}
	});
};

editBtn.addEventListener("click", editReview);
