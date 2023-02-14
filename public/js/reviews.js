const editBtn = document.getElementById("edit-btn");

const editText = () => {
	console.log("you clicked the edit button");
};

const editReview = () => {
	fetch("/user/reviews", {
		method: "PUT",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
};

editBtn.addEventListener("click", editText);
