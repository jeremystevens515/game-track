const loginFormEl = document.getElementById("login");
const userNameInputEl = document.getElementById("username");
const passwordInputEl = document.getElementById("password");
const continueBtn = document.getElementById("continue");

const getUserInfo = (event) => {
	event.preventDefault();
	const data = {
		username: userNameInputEl.value,
		password: passwordInputEl.value,
	};
	fetch("/user/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		// console.log("response:", res);
		if (res.ok) {
			document.location.replace("/");
		} else {
			if (document.querySelector(".bad-login")) {
				document.querySelector(".bad-login").remove();
			}
			const createEl = document.createElement("p");
			createEl.classList = "bad-login";
			createEl.innerHTML = "Incorrect password. Please enter a valid password";
			loginFormEl.appendChild(createEl);
		}
	});
};

continueBtn.addEventListener("click", getUserInfo);
