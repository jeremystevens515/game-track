const editBtn = document.getElementById("edit-btn");
const textDisplayEl = document.getElementById("text-display");
const textEditorEl = document.getElementById("text-editor");

const editText = (event) => {
	console.log("you clicked the edit button");

	// if button says edit
	if (editBtn.innerHTML == "Edit") {
		// change button to submit
		editBtn.innerHTML = "Submit";
	} else {
		// change button to edit
		editBtn.innerHTML = "Edit";

		const gameID = editBtn.getAttribute("data-gameId");
		console.log("gameID: ", gameID);
		const reviewText = document.getElementById("text-editor-textarea").value;
		editReview(gameID, reviewText);
	}

	// if reivew text is visible
	if (textDisplayEl.dataset.visible == "true") {
		textDisplayEl.dataset.visible = "false";
		textDisplayEl.setAttribute("style", "display: none");

		textEditorEl.removeAttribute("style");
		textEditorEl.dataset.visible = "true";

		console.log("text display data-visible", textDisplayEl.dataset.visible);
	} else {
		textEditorEl.dataset.visible = "false";
		textEditorEl.setAttribute("style", "display: none");

		textDisplayEl.dataset.visible = "true";
		textDisplayEl.removeAttribute("style");
		console.log("text display visible");
	}
};

const editReview = (gameID, reviewText) => {
	const data = {
		game_id: gameID,
		review_text: reviewText,
	};

	fetch("/user/reviews", {
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

editBtn.addEventListener("click", editText);
