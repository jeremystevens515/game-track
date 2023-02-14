let signupButton = document.querySelector(".btn-primary");

function validatePassword(event) {
	event.preventDefault();
	const password = document.getElementById("password").value;
	const confirmPassword = document.getElementById("confirm-password").value;

	if (password === confirmPassword) {
		signup();
	} else {
		if (document.querySelector(".bad-login")) {
			document.querySelector(".bad-login").remove();
		}
		const createEl = document.createElement("p");
		createEl.classList = "bad-login";
		createEl.innerHTML = "Passwords do not match. Please re-enter your password.";
		document.getElementById("signup-form").appendChild(createEl);
	}
}

// Send PUT request to server to Add Game to Wishlist
function signup() {
	let user_name = document.getElementById("signupUsername").value.trim().toLowerCase();
	let user_password = document.getElementById("password").value.trim();

	console.log("click", user_name, user_password);
	fetch("/user/signup", {
		method: "POST",
		body: JSON.stringify({
			username: user_name,
			password: user_password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (res.ok) {
			document.location.replace("/");
		} else {
			if (document.querySelector(".bad-login")) {
				document.querySelector(".bad-login").remove();
			}
			const createEl = document.createElement("p");
			createEl.classList = "bad-login";
			createEl.innerHTML = "Your username is already taken. Please choose another username";
			document.getElementById("signup-form").appendChild(createEl);
		}
	});
}

signupButton.addEventListener("click", validatePassword);
